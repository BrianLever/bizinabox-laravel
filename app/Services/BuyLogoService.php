<?php

namespace App\Services;

use App\Enums\PurchaseTypeEnum;
use App\Exceptions\UnexpectedException;
use App\Models\Logo\UserLogo;
use App\Repositories\UserLogoRepository;

class BuyLogoService
{
    const PAYMENT_CART_URL  = 'https://secure.2checkout.com/checkout/buy';
    const ADDITION_LOGO_KEY = 'ADDITIONAL_LOGO_ID';

    /**
     * @var UserLogoRepository
     */
    protected $userLogoRepository;

    /**
     * BuyLogoService constructor.
     *
     * @param UserLogoRepository $userLogoRepository
     */
    public function __construct(UserLogoRepository $userLogoRepository)
    {
        $this->userLogoRepository = $userLogoRepository;
    }

    /**
     * @param UserLogo $userLogo
     * @param int      $purchaseType
     *
     * @return string
     */
    public function getPaymentCartUrl(UserLogo $userLogo, int $purchaseType): string
    {
        $params = $this->getCartUrlParams($userLogo, $purchaseType);

        return self::PAYMENT_CART_URL.'?'.$params;
    }

    /**
     * @param UserLogo $userLogo
     * @param int      $purchaseType
     *
     * @return string
     */
    protected function getCartUrlParams(UserLogo $userLogo, int $purchaseType): string
    {
        $params = [
            self::ADDITION_LOGO_KEY => $userLogo->hash,
            'merchant'              => config('2checkout.merchant'),
            'tpl'                   => config('2checkout.tpl'),
            'style'                 => config('2checkout.style'),
            'test'                  => $this->isTestMode() ? 1 : 0,
        ];

        switch ($purchaseType) {
            case PurchaseTypeEnum::PACKAGE:
                $params['prod'] = config('2checkout.types.package');
                break;
            case PurchaseTypeEnum::LOGOTYPE:
                $params['prod'] = config('2checkout.types.logotype');
                break;
        }


        return http_build_query($params);
    }

    /**
     * @param array $data
     *
     * @return UserLogo
     * @throws UnexpectedException
     */
    public function savePurchaseData(array $data): UserLogo
    {
        /** @var UserLogo $userLogo */
        $userLogo = $this
            ->userLogoRepository
            ->makeModel()
            ->whereHash($this->getLogoId($data))
            ->first();

        $purchase = $userLogo->getPurchase((int) $data['type']);
        $isTestPurchase = (string) data_get($data, 'test') === '1';

        if ($isTestPurchase && !$this->isTestMode()) {
            throw new UnexpectedException('Unable to save payment data!');
        }

        if (is_null($purchase) && isset($data['signature'])) {
            $merchantId = data_get($data, 'merchant');
            $total = (float) data_get($data, 'total');
            $currency = data_get($data, 'total-currency');
            $type = data_get($data, 'type');

            $userLogo->purchases()->create([
                'type'        => $type,
                'merchant_id' => $merchantId,
                'total'       => $total,
                'currency'    => $currency,
                'meta'        => $data,
            ]);

            return $userLogo->fresh();
        }
    }

    /**
     * @param array $data
     *
     * @return string
     */
    private function getLogoId(array $data): string
    {
        return data_get($data, 'ADDITIONAL_LOGO_ID');
    }

    /**
     * @return bool
     */
    private function isTestMode(): bool
    {
        return envIs('local') || auth()->user()->isAdmin();
    }
}
