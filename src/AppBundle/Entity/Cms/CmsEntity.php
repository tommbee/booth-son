<?php

namespace AppBundle\Cms\Entity;

use AppBundle\Cms\User\CmsUser;

abstract class CmsEntity implements CmsEntityInterface
{
    /**
     * Get the records title
     * @return string The records title
     */
    public function getTitle()
    {

    }

    /**
     * Get the records published date
     * @return Date The records date
     */
    public function getPublishedDate()
    {

    }

    /**
     * Gets the records author
     * @return CmsUser The user who created the record.
     */
    public function getAuthorName()
    {

    }
}