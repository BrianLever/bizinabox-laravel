<?php

namespace App\Policies;

use App\Models\UserFavicon;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;

class UserFaviconPolicy extends BasePolicies
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  User  $user
     * @param  UserFavicon  $userFavicon
     * @return mixed
     */
    public function view(User $user, UserFavicon $userFavicon): object
    {
        return $this->isUserFavicon($user, $userFavicon);
    }

    /**
     * @param User     $user
     * @param UserFavicon $userFavicon
     *
     * @return bool
     */
    public function saveFavicon(User $user, UserFavicon $userFavicon): bool
    {
        return $this->isUserFavicon($user, $userFavicon);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user, $faviconHash): bool
    {
        return (bool) $faviconHash;
    }


    /**
     * @param User     $user
     * @param UserFavicon $userFavicon
     *
     * @return bool
     */
    protected function isUserFavicon(User $user, UserFavicon $userFavicon): bool
    {
        return $user->id === $userFavicon->user_id;
    }
}
