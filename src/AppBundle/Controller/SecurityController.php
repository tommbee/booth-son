<?php

namespace AppBundle\Controller;

use FOS\UserBundle\Controller\SecurityController as BaseController;
use Symfony\Component\HttpFoundation\RedirectResponse;

class SecurityController extends BaseController
{    
    /**
     * @inheritdoc
     */
    protected function renderLogin(array $data)
    {
        if (($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_REMEMBERED'))) {
            return new RedirectResponse('/profile');
        }

        return $this->render('Security/login.html.twig', $data);
    }
}