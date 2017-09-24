<?php

namespace Biz\System\Service\Impl;

use Biz\BaseService;
use Biz\System\Service\StatisticsService;
use Topxia\Service\Common\ServiceKernel;

class StatisticsServiceImpl extends BaseService implements StatisticsService
{
    public function countOnline($retentionTime)
    {
        return $this->getOnlineService()->countOnline($retentionTime);
    }

    public function countLogin($retentionTime)
    {
        return $this->getOnlineService()->countLogined($retentionTime);
    }

    protected function getSessionDao()
    {
        return $this->createDao('System:SessionDao');
    }
    
    protected function getOnlineService()
    {
        return $this->biz->service('Session:OnlineService');
    }

    protected function getSettingService()
    {
        return $this->biz->service('System:SettingService');
    }

    protected function getRedis()
    {
        return ServiceKernel::instance()->getRedis();
    }
}
