
<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Colegios_model extends CI_Model{

	function traer_colegios($limite){

		$valor = ($limite + 0);
		$valor = is_int($valor);
		if($valor){
			if($limite>0){
				$this->db->where('RBD', $limite);
				$a = $this->db->get('core_cliente_sep');
				$row = $a->result_array();
				$colegios = array();
				foreach($row as $col){
					array_push($colegios, array("colegio"=>$col, 
												"contactos"=>$this->buscar_contacto($col['RBD']),
												"mineduc_data"=>$this->buscar_mineduc($col['RBD'])	
												)
					);
				}

				return $colegios;

			}else{
				$this->db->like('NOMBRE', $limite);
				$this->db->order_by('NOMBRE_REGION, COMUNA');
				$this->db->limit(30);
				$a = $this->db->get('core_cliente_sep');
				return $a->result_array();
			}	
		}else{
		
			$this->db->like('NOMBRE', $limite);
			$this->db->order_by('NOMBRE_REGION, COMUNA');
			$this->db->limit(20);
			$a = $this->db->get('core_cliente_sep');
			return $a->result_array();
		}
		
	}

	function buscar_contacto($rbd){
		$this->db->where('RBD', $rbd);
		$a = $this->db->get('core_cliente_contacto');
		return $a->result_array(); 
	}

	function buscar_mineduc($rbd){
		$this->db->where('RBD', $rbd);
		$a = $this->db->get('core_cliente_mineduc');
		$row = $a->result_array(); 
		
		if($a->num_rows()>0){
			return array("datos_mineduc"=>$row[0], "colegios_sostenedor"=>$this->buscar_colegios_sostenedor($row['0']['RUT_SOSTENEDOR']));

		}else{
			return array();
		}
		
	}

	function buscar_colegios_sostenedor($rut){
		
		$this->db->where('RUT_SOSTENEDOR', $rut);
		$a = $this->db->get('core_cliente_mineduc');
		$row = $a->result_array(); 

		return $row;

	}
}

 ?>
