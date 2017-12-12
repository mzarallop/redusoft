<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	function __construct(){
		
		parent::__construct();
		$this->load->model('Colegios_model');
		header('Access-Control-Allow-Origin: *');
		header('Content-Type: application/json');
	}

	public function index()
	{	
		$rbd = $this->uri->segment(3);
		$dato = $this->Colegios_model->traer_colegios($rbd);
		echo json_encode($dato);
	}

	public function listaColegios()
	{
		$rbd = $this->uri->segment(3);
		$dato = $this->Colegios_model->traer_colegios($rbd);
		echo json_encode($dato);
	}

	public function pruebas(){
	}
}
