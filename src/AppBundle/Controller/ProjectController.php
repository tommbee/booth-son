<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProjectController extends Controller
{
    /**
     * @Route("/projects", name="projects")
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/projects.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/projects/{id}/{title}", requirements={"id" = "\d+"}, name="projectview")
     * @param int $id
     * @param string $title
     * @return Response
     */
    public function showAction($id, $title)
    {
        return $this->render("default/project-{$id}.html.twig", [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/projects", name="projectsave")
     * @Method({"POST"})
     * @param Request $request
     */
    public function saveAction(Request $request)
    {
        echo 'save!';
    }
}