<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('colegiosModel');
		header('Content-Type: application/json');
	}

	public function index()
	{	
		$dato = $this->colegiosModel->traer_colegios(1);
		print_r(json_encode($dato));
	}

	public function listaColegios()
	{
		$dato = $this->colegiosModel->traer_colegios(1);
		print_r(json_encode($dato));
	}
}
