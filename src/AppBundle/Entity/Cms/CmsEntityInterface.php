<?php

namespace AppBundle\Entity\Cms;

use AppBundle\Entity\User\CmsUser;

interface CmsEntityInterface
{
    /**
     * Get the records title
     * @return string The records title
     */
    public function getTitle();

    /**
     * Get the records published date
     * @return Date The records date
     */
    public function getUpdatedDate();

    /**
     * Gets the records author
     * @return CmsUser The user who created the record.
     */
    public function getAuthorName();
}