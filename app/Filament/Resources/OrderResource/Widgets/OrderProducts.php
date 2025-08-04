<?php

namespace App\Filament\Resources\OrderResource\Widgets;

use Filament\Widgets\Widget;

class OrderProducts extends Widget
{
    protected static string $view = 'filament.resources.order-resource.widgets.order-products';

    public $record;

    public function mount($record)
    {
        $this->record = $record;
    }

    protected function getViewData(): array
    {
        return [
            'products' => $this->record->products,
        ];
    }
}
