<?php

namespace AppBundle\Cms\Entity;

interface MediaEntityInterface
{
    /**
     * Get the media entities width
     * @return int The width
     */
    public function getWidth();

    /**
     * Get the media entities height
     * @return int The height
     */
    public function getHeight();

}