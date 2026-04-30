<?php

namespace App\Services;

use GuzzleHttp\Client;

/**
 * RecaptchaService — verifies Google reCAPTCHA v3 tokens.
 */
class RecaptchaService
{
    protected string $secretKey;
    protected Client $client;

    public function __construct()
    {
        $this->secretKey = getenv('RECAPTCHA_SECRET_KEY') ?: '';
        $this->client = new Client(['timeout' => 10]);
    }

    /**
     * Verify a reCAPTCHA token.
     *
     * @param string $token
     * @return bool True if valid, false otherwise
     */
    public function verify(string $token): bool
    {
        // Skip in development when no key is set
        if (empty($this->secretKey) || empty($token)) {
            return true;
        }

        try {
            $response = $this->client->post('https://www.google.com/recaptcha/api/siteverify', [
                'form_params' => [
                    'secret' => $this->secretKey,
                    'response' => $token,
                ],
            ]);

            $result = json_decode($response->getBody()->getContents(), true);

            return ($result['success'] ?? false) && ($result['score'] ?? 0) > 0.5;
        } catch (\Exception $e) {
            log_message('error', 'reCAPTCHA verification failed: ' . $e->getMessage());
            return false;
        }
    }
}
