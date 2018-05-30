<?php

namespace AppBundle\Controller;

use FOS\UserBundle\Controller\SecurityController as BaseController;

class SecurityController extends BaseController
{    
    /**
     * @inheritdoc
     */
    protected function renderLogin(array $data)
    {
        return $this->render('Security/login.html.twig', $data);
    }
}