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
		$rbd = urldecode($rbd);
		$dato = $this->Colegios_model->traer_colegios($rbd);
		echo json_encode($dato);
	}

	public function fichaColegio()
	{
		$rbd = $this->uri->segment(3);
		$rbd = urldecode($rbd);
		$dato = $this->Colegios_model->ficha_colegio($rbd);
		echo json_encode($dato);
	}

	public function pruebas(){
	}

	public function regionalizacion(){
		$dato = $this->Colegios_model->mostrar_regionalizacion();
		echo json_encode($dato);
	}

	public function contacto(){
		$dato = $this->Colegios_model->contacto($_POST);
		echo json_encode($dato);
	}
}
