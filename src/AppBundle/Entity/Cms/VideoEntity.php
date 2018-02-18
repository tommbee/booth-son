<?php

namespace AppBundle\Entity\Cms;

use AppBundle\Entity\Cms\MediaEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="videos")
 */
class VideoEntity extends MediaEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $duration;

    /**
     * Set the value of duration
     * @param $duration
     * @return self
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * Get the video duration
     * @return int video duration in seconds
     */
    public function getVideoDuration()
    {
        return $this->duration;
    }

}