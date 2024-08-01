package fuel.retail;

import java.util.ArrayList;

public class KPI {
	private String kpi_name;
    private ArrayList<PON> pons;
    
 
    KPI(String kpi_name) {
    	this.kpi_name = kpi_name;
   	    pons = new ArrayList<PON>();
    	//pons.add(new PON());
    }
    
    String get_kpi_name() {return kpi_name;}
    void set_kpi_name(String kpi_name) {
    	this.kpi_name = kpi_name;
    }

    public class PON {
       private String pon_name;
       private String [] kpi_values;
   
       
       PON (String pon_name) {
    	  this.pon_name = pon_name; 
          kpi_values = new String [12];
          
       }

       String get_pon_name() {return pon_name;}

       String get_kpi_value_at_index(int idx) {return kpi_values[idx];}
       
       String [] get_kpi_values() {return kpi_values;}


       void set_pon_name(String pon_name) {this.pon_name = pon_name;}

       void set_kpi_value(int idx, String kpi_value) { 
    	   kpi_values[idx] = kpi_value;
       }
    }
    ArrayList<PON> get_pons() {return pons;}
}

