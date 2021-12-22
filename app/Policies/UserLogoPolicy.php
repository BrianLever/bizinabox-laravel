<?php

namespace App\Policies;

use App\Models\Logo\UserLogo;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserLogoPolicy extends BasePolicies
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Logo\UserLogo  $userLogo
     * @return mixed
     */
    public function view(User $user, UserLogo $userLogo)
    {
        return $this->isUserLogo($user, $userLogo);
    }

    /**
     * @param User     $user
     * @param \App\Models\Logo\UserLogo $userLogo
     *
     * @return bool
     */
    public function saveLogo(User $user, UserLogo $userLogo): bool
    {
        return $this->isUserLogo($user, $userLogo);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user, $logoHash)
    {
        return (bool) $logoHash;
    }


    /**
     * @param User     $user
     * @param \App\Models\Logo\UserLogo $userLogo
     *
     * @return bool
     */
    protected function isUserLogo(User $user, UserLogo $userLogo): bool
    {
        return $user->id === $userLogo->user_id;
    }
}
