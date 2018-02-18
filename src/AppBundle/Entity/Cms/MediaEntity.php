<?php

namespace AppBundle\Entity\Cms;

use AppBundle\Entity\Cms\MediaEntityInterface;
use AppBundle\Entity\Cms\CmsEntity;
use Doctrine\ORM\Mapping as ORM;

abstract class MediaEntity extends CmsEntity implements MediaEntityInterface
{
    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $width;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $height;

    /**
     * Set the value of width
     * @param $width
     * @return self
     */
    public function setWidth($width)
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Get the media entities width
     * @return int The width
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * Set the value of height
     * @param $height
     * @return self
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get the media entities height
     * @return int The height
     */
    public function getHeight()
    {
        return $this->height;
    }

}
