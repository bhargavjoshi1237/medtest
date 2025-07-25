<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Repositories\NotificationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends BaseController
{
    public function __construct( public NotificationRepository $notificationRepository)
    {
    }
    
    public function index()
    {
        $notifications = $this->notificationRepository->getAll(['product:id,name']);
        return inertia('Notification/Index', [
            'notifications' => $notifications
        ]);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
    }

    public function show(Notification $notification)
    {
    }

    public function edit(Notification $notification)
    {
    }

    public function update(Request $request, Notification $notification)
    {
    }

    public function destroy(Notification $notification)
    {
        DB::beginTransaction();
        try {
            $this->notificationRepository->destroy($notification->id);
            DB::commit();
            return $this->sendRedirectResponse(route('notification.index'), 'Notification deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('notification.index'), 'Failed to delete notification.');
        }
    }
}
