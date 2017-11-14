<?php 
class colegiosModel extends CI_model{

	function __construct(){
		parent::__construct();
		
	}

	function traer_colegios($limite){

		$a = $this->db->get('core_cliente_sep');
		return $a->result_array();
	}
}

 ?>
