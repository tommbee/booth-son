<?php

namespace AppBundle\Entity\Cms;

use AppBundle\Entity\Cms\CmsEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="projects")
 */
class ProjectEntity extends CmsEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * Get the value of description
     * @return string The project description
     */ 
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set the value of description
     * @param $description
     * @return self
     */ 
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }
}
