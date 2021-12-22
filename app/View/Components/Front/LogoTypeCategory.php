<?php

namespace App\View\Components\Front;

use App\Models\Logo\LogoCategory;
use Illuminate\View\Component;

class LogoTypeCategory extends Component
{
    public $categories;
    public $selected;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($selected)
    {
        $this->categories = LogoCategory::with("media")
            ->orderBy('order','asc')
            ->get(['id', 'name']);

        $this->selected = $selected;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.front.logo-type-category');
    }
}
