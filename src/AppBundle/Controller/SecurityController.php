<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\UserBundle\Controller\SecurityController as BaseController;
use Symfony\Component\HttpFoundation\Request;

class SecurityController extends BaseController
{    
    /**
     * @inheritdoc
     */
    protected function renderLogin(array $data)
    {
        return $this->render('@AppBundle/Resources/views/Security/login.html.twig', $data);
    }
}