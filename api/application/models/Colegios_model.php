
<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Colegios_model extends CI_Model{

	function traer_colegios($limite){

		$valor = ($limite + 0);
		$valor = is_int($valor);
		if($valor){
			if($limite>0){
				
				$this->db->from('core_cliente_sep_b a');
				$this->db->order_by('a.N_BEN', 'DESC');
				$this->db->where('a.RBD', $limite);
				$a = $this->db->get();
				return $a->result_array();

			}else{
				$this->db->from('core_cliente_sep_b a');
				$this->db->order_by('a.N_BEN', 'DESC');
				$this->db->like('a.NOM_RBD', $limite);
				$a = $this->db->get();

				return $a->result_array();
			}	
		}else{
			$this->db->select('ccm.*, ccs.N_BEN ALUMNOS_SEP, ccs.NOM_COM_RBD COMUNA, ccs.COD_REG_RBD NOMBRE_REGION');
			$this->db->from('core_cliente_mineduc ccm');
			$this->db->join('core_cliente_sep_b ccs', 'ccm.RBD = ccs.RBD', 'left');
			$this->db->like('ccs.NOMBRE', $limite);
			$this->db->order_by('ccs.NOMBRE_REGION, ccs.COMUNA');
			$this->db->limit(20);
			$a = $this->db->get();
			return $a->result_array();
		}
		
	}

	function ficha_colegio($data){
				$this->db->select('a.*, b.RUT_SOSTENEDOR');
				$this->db->from('core_cliente_sep_b a');
				$this->db->join('core_cliente_mineduc b', 'a.RBD = b.RBD', 'LEFT');
				$this->db->order_by('a.N_BEN', 'DESC');
				$this->db->where('a.RBD', $data);
				$a = $this->db->get();
				$row = $a->result_array();
				$colegios = array();
				foreach($row as $col){
					array_push($colegios, array("colegio"=>$col, 
												"contactos"=>$this->buscar_contacto($col['RBD']),
												"mineduc_data"=>$this->buscar_mineduc($col['RBD']),
												"sostenedor"=>$this->buscar_sostenedor($col['RUT_SOSTENEDOR']),
												"sned"=>$this->buscar_sned($col['RBD'])
												)
					);
				}

				return $colegios;
	}

	function buscar_contacto($rbd){
		$this->db->where('RBD', $rbd);
		$a = $this->db->get('core_cliente_contacto');
		return $a->result_array(); 
	}

	function buscar_mineduc($rbd){
		$this->db->select('ccm.*, ccs.N_BEN ALUMNOS_SEP, ccs.COD_REG_RBD NOMBRE_REGION, ccs.NOM_COM_RBD COMUNA, ccs.COD_DEPE DEPENDENCIA, ccs.ANO_INGRESO_SEP ANO_CONVENIO, ccs.COD_REG_RBD REGION');
		$this->db->from('core_cliente_mineduc ccm');
		$this->db->join('core_cliente_sep_b ccs', 'ccm.RBD = ccs.RBD', 'left');
		//$this->db->order_by('NOMBRE_REGION, COMUNA');
		$this->db->where('ccm.RBD', $rbd);
		$a = $this->db->get();
		$row = $a->result_array(); 
		
		if($a->num_rows()>0){
			return array("datos_mineduc"=>$row[0], 
				"colegios_sostenedor"=>$this->buscar_colegios_sostenedor($row['0']['RUT_SOSTENEDOR']));

		}else{
			return array();
		}
		
	}

	function buscar_colegios_sostenedor($rut){
		
		$this->db->select('ccm.RBD, ccm.NOM_RBD, ccs.*');
		$this->db->where('ccm.RUT_SOSTENEDOR', $rut);
		$this->db->from('core_cliente_mineduc ccm');
		$this->db->join('core_cliente_sep_b ccs', 'ccm.RBD = ccs.RBD', 'left');
		$this->db->order_by('ccs.N_BEN', 'DESC');
		$a = $this->db->get();
		$row = $a->result_array(); 

		return $row;

	}

	function buscar_sostenedor($rut){
		$this->db->from('core_cliente_sostenedores a');
		$this->db->where('RUT_SOST', $rut);
		return $this->db->get()->result_array();
	}

	function buscar_sned($rbd){
		
		$this->db->from('core_cliente_sned a');
		$this->db->where('a.RBD', $rbd);
		$a = $this->db->get();
		$total = $a->num_rows();
		if($total>0){

			$row = $a->result_array();

			$datos = array(
				"titulos"=>array("Efectvidad", "Superación", "Inicia", "Mejorar", "Integración", "Igualdad"),
				"data"=>array(
					floatval($row[0]['EFECTIVR']), 
					floatval($row[0]['SUPERAR']), 
					floatval($row[0]['INICIAR']), 
					floatval($row[0]['MEJORAR']), 
					floatval($row[0]['INTEGRAR']), 
					floatval($row[0]['IGUALDR'])), 
				"total"=>$total,
				"promedio"=>array(floatval($row[0]['INDICER']), 100)
			);

			return $datos;

		}else{
			return array("total"=>0);
		}
		
	}

	function mostrar_regionalizacion(){
		$regiones = $this->db->get('core_regiones_detalle')->result_array();
		$comunas = $this->db->get('core_comunas')->result_array();
		return array("regiones"=>$regiones, "comunas"=>$comunas);
	}

	function contacto($mensaje){
		$this->db->insert('core_mensajes', $mensaje);
	}



}

 ?>
