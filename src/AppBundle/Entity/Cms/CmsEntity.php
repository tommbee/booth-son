<?php

namespace AppBundle\Entity\Cms;

use AppBundle\Entity\User\CmsUser;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Cms\CmsEntityInterface;

abstract class CmsEntity implements CmsEntityInterface
{

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $title;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $updated;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $author;

    /**
     * Set the value of title
     * @param string $title
     * @return self
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get the records title
     * @return string The records title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set the value of updated
     * @return self
     */
    public function setUpdated()
    {
        $this->updated = new \DateTime("now");

        return $this;
    }

    /**
     * Get the records published date
     * @return Date The records date
     */
    public function getUpdatedDate()
    {
        return $this->updated;
    }

    /**
     * Gets the records author
     * @return CmsUser The user who created the record.
     */
    public function getAuthorName()
    {
        return $this->author->getName();
    }

}