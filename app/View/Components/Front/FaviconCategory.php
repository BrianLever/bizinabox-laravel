<?php

namespace App\View\Components\Front;

use Illuminate\View\Component;

class FaviconCategory extends Component
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
        $this->categories = \App\Models\FaviconCategory::with("media")
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
        return view('components.front.favicon-category');
    }
}
