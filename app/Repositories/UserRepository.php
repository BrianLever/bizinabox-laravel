<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class UserRepository extends BaseRepository
{
    public $model = User::class;

    /**
     * @param array $data
     *
     * @return User
     * @throws \Throwable
     */
    public function create(array $data): User
    {

        $newsletter = $data['newsletter'];

        unset($data['newsletter']);

        $user = \DB::transaction(function () use ($data) {
            if (!data_get($data, 'name')) {
                $fullName = $this->generateNameByEmail(data_get($data, 'email'));
            } else {
                // For social auth registration
                $fullName = data_get($data, 'name');
            }

            $user = $this->model->create(array_merge([
                'name' => $fullName,
            ], $data));

            return $user;
        });

        if($newsletter)
        {
            $user->registerAsSubscriber(false);
        }

        // If register by social auth
        if (data_get($data, 'social_meta')) {
            $user->markEmailAsVerified();
        } else{
            $user->sendPassword();

        }

        return $user;
    }

    /**
     * @param Model $user
     * @param array $data
     *
     * @return User
     * @throws \Throwable
     */
    public function update(Model $user, array $data = []): User
    {
        return \DB::transaction(function () use ($user, $data) {
            // Fill data
            $user->fill($data);

            // Delete verification if email is changed
            // and resend email verification
            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
                $user->save();
                $user->sendEmailVerificationNotification();

                return $user;
            }

            // Save user
            $user->save();

            return $user;
        });
    }

    /**
     * @param string $email
     *
     * @return string
     */
    protected function generateNameByEmail(string $email): string
    {
        try {
            $name = Arr::first(explode('@', $email));
            $name = Str::replaceArray(' ', ['.', '_', '-'], $name);
            $name = explode(' ', $name);

            $fullName = null;

            foreach ($name as $item) {
                $fullName .= ' '.ucfirst($item);
            }

            return trim($fullName);
        } catch (\Exception $e) {
            return $email;
        }
    }
}