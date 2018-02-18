<?php

namespace AppBundle\Entity\Cms;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Cms\MediaEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="images")
 */
class ImageEntity extends MediaEntity
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
    private $mimeType;

    /**
     * Set the value of mimeType
     * @return self
     */
    public function setMimeType($mimeType)
    {
        $this->mimeType = $mimeType;

        return $this;
    }

    /**
     * Returns the image mime type
     * @return string The mime type
     */
    public function getImageType()
    {
        return $this->mimeType;
    }

}
