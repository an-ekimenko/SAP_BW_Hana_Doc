package fuel.retail;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.text.DateFormat.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class Main {

	private	static String  FILE = "\\\\aup-fs\\ivc\\a.ekimenko\\Плановое задание УНПО и УОСиРП.xls";
	
	private	File txt_file = null;
	public void setTxtFile(File f) { this.txt_file = f;}
	public File getTxtFile() { return this.txt_file;}
	
	private  final  boolean directly = false;

	//private  XSSFWorkbook   book;
	//private  XSSFSheet      sheet;
	
	private HSSFWorkbook   book;
	private HSSFSheet      sheet;
	private FormulaEvaluator evaluator;
	
	String st;
	String XlsContent;
	
	ArrayList<KPI> kpi_arr;
	ArrayList<KPI.PON> pons;
	java.util.Date curr_date;
	SimpleDateFormat frmtDate;
	
	
	public Main(String FILE) {
		Main.FILE = FILE;
		new Main();
	}
	
	public Main()
	{
		kpi_arr = new ArrayList<KPI>();
		if (directly)
			openBookDirectly(FILE);
		else
			try {
				openBook(FILE);
			} catch (InvalidFormatException e1) {
				e1.printStackTrace();
			}
		if (book != null) {
			evaluator = book.getCreationHelper().createFormulaEvaluator();
			curr_date = new Date();
			frmtDate = new SimpleDateFormat("yyyy");
			sheet = book.getSheet("План_" + frmtDate.format(curr_date) + " ПОН");
			if (sheet != null) {
				readCells();
				//readCells_v3();
			} else {
				System.out.println ("Excel sheet not found");
			}
			try {
				if (!directly)
					book.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else
			System.out.println ("Error reading Excel file");
	}
	
	public Set<String> listFilesUsingFilesList(String dir) throws IOException {
		// Files.list() - return a Stream<Path>, the elements of which are the 
		// entries in the directory.
	    try (Stream<Path> stream = Files.list(Paths.get(dir))) {
	        return stream
	          .filter(file -> !Files.isDirectory(file))
	          .map(Path::getFileName)
	          .map(Path::toString)
	          .collect(Collectors.toSet());
	    }
	}
	
	private void openBook(final String path) throws InvalidFormatException
	{
	   try {
	  	   System.out.println("path is " + java.net.URLDecoder.decode(path, "UTF-8"));	  	   
    	   File file = new File(java.net.URLDecoder.decode(path, "UTF-8"));
	  	   System.out.println("file is " + file.toString());
		   //book = (XSSFWorkbook) WorkbookFactory.create(file);
		   book = (HSSFWorkbook) WorkbookFactory.create(file);
//			InputStream is = new FileInputStream(FILE);
//			book = (XSSFWorkbook) WorkbookFactory.create(is);
//			is.close();
    	   
	   } catch (IOException e1) { e1.printStackTrace(); }
         catch (EncryptedDocumentException e) {	e.printStackTrace(); } 
	}

	private void openBookDirectly(final String path)
	{
		File file = new File(path);
		try {
			OPCPackage pkg = OPCPackage.open(file);
			//book = new XSSFWorkbook(pkg);
			//book = new HSSFWorkbook(pkg);
			pkg.close();
		} catch (InvalidFormatException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args)
	{
		new Main();
		System.exit(0);
	}
	
	private static Integer[] findLengthOfArrays(int[][] multiDimensionalArray) {
	    return Arrays.stream(multiDimensionalArray)
	      .map(array -> array.length)
	      .toArray(Integer[]::new);
	}
		
	private void readCells()
	{
		// Defining boundary processing lines
		int rowStart = Math.min(  0, sheet.getFirstRowNum());
		int rowEnd   = Math.max(100, sheet.getLastRowNum());
		//System.out.println("sheet.getFirstRowNum() - " + sheet.getFirstRowNum());
		//System.out.println("sheet.getLastRowNum() - " + sheet.getLastRowNum());

		for (int rw = rowStart; rw < rowEnd; rw++) {
			//XSSFRow row = sheet.getRow(rw);
			HSSFRow row = sheet.getRow(rw);
		    if (row == null) {
		        System.out.println("row '" + rw + "' is not created");
		        continue;
		    }
			short minCol = row.getFirstCellNum();
			short maxCol = row.getLastCellNum();
			for(short col = minCol; col < maxCol; col++) {
				// @SuppressWarnings("deprecation")
				// XSSFCell cell = rw.getCell(col, XSSFRow.RETURN_BLANK_AS_NULL);
				//XSSFCell cell = row.getCell(col);
				HSSFCell cell = row.getCell(col);
				if (cell == null) {
				    	// System.out.println("cell '" + col + "' is not created");
				        continue;
				 }
				 //printCell(row, cell);
				 XlsContent = XlsContent + readCell(row, cell);
		    }
		}
		

		String [] temp_arr = XlsContent.split(">>");
		for(String st: temp_arr) {
			if (st.length() > 20) System.out.println (st);
		}
		
		int kpi_idx = 0;
		int month_idx = 0;
		
		boolean first_kpi_found = false;
		boolean kpi_found = false;
		boolean last_pon_found = false;
		KPI kpi = null;
		KPI.PON pon = null;
		Pattern ptValue = Pattern.compile("[0-9]{0,}\\.*[0-9]{0,}");
		Pattern ptPON = Pattern.compile("[а-яА-Я|\"|\\-|\\s]{15,}");
		Matcher mch;
		
		for (String st: temp_arr) {
			if (st.equalsIgnoreCase("null")) continue;
		  	//System.out.println("->" + st);
	 	    if (kpi_idx > 11) { break;} //Because only 10 indicators defined	
		    if (kpi_found) {  
			   if (st.equalsIgnoreCase("ПО \"Белоруснефть\"")) {
				   last_pon_found = true; 
				   month_idx = 0;
 				   pons = kpi.get_pons();
				   pons.add(kpi.new PON(st));
				   pon = pons.get(pons.size()-1);
				   continue;
			   }
			   if (st.equalsIgnoreCase("%")) continue;
			   mch = ptValue.matcher(st);
			   if (mch.matches() & pon!=null) { 
				   pon.set_kpi_value(month_idx++, st);
				   if (month_idx > 11) {
					   if (last_pon_found) { 
						   kpi_found = false; 
						   last_pon_found = false; 
					   }
					   month_idx = 0; pon = null;
					   continue;
				   }
			   } else { // Check for PON name
						mch = ptPON.matcher(st);
						if (mch.matches() & st.contains("нефт"))  { // new PON name is found
							pons = kpi.get_pons();
							pons.add(kpi.new PON(st));
							pon = pons.get(pons.size()-1);
							month_idx = 0;
						}
				      }
		   }
		   else { // Skip everything until find the description of the next KPI
		      if (st.length() > 50) { 
		    	  if (!first_kpi_found) {
		    		  if (st.contains("Темп")) { 
		    			  first_kpi_found = true;
		    		  } else continue; 
		    	  }
		    	  // KPI was found
		    	  kpi_arr.add(new KPI(st));
		    	  kpi = kpi_arr.get(kpi_arr.size()-1);
		    	  kpi_found = true;
		    	  kpi_idx++;
		    	  month_idx = 0;
		      }
		   }
		}
//		for (KPI kpi_: kpi_arr) {
//			System.out.println(kpi_.get_kpi_name());
//			pons = kpi_.get_pons();
//			float val;
//			for (KPI.PON pon_ : pons) {
//				System.out.println("\t" + pon_.get_pon_name());
//				String [] kpi_values_ = pon_.get_kpi_values();
//				System.out.print("\t");
//				for (String kpi_value : kpi_values_) {
//					System.out.printf("%.1f%s", Float.valueOf(kpi_value), " ");
//				}
//				System.out.println();
//			}
//		}
		setTxtFile(writeToTXT());
	}
	
	//private void writeToTXT ()  {
	private File writeToTXT ()  {		
		java.util.Date curr_date = new Date();
		SimpleDateFormat frmtDate = new SimpleDateFormat("yyyy");
		String txtFileName = "KPI_v3.txt"; 
		//File txt_file = new File("\\\\AUP-FS\\Ivc\\a.ekimenko", txtFileName);
		this.setTxtFile(new File("\\\\AUP-FS\\Ivc\\a.ekimenko", txtFileName)); 		
		System.out.println(txt_file.getAbsolutePath().toString());
		double scale = Math.pow(10, 3); // 10 to power 3
		double result; 
		String kpi_key;
		try(Writer writer = new BufferedWriter( new OutputStreamWriter(new FileOutputStream(
				txt_file), "UTF-8"))) {
			int kpiNumInOrder = 1;
			for (KPI kpi_: kpi_arr) {
				pons = kpi_.get_pons();
				float val;
				//int kpiNumInOrder = 1;
				for (KPI.PON pon_ : pons) {
					writer.write(frmtDate.format(curr_date) + ";");
					kpi_key = String.format("%3s", Integer.toString(kpiNumInOrder));
					kpi_key = kpi_key.replace(" ", "0");
					writer.append(frmtDate.format(curr_date) + kpi_key + ";");
					writer.append(kpi_.get_kpi_name() + ";");
					writer.append(pon_.get_pon_name() + ";");
					String [] kpi_values_ = pon_.get_kpi_values();
					for (int i = 0; i < kpi_values_.length; i++ ) {
						result = Math.ceil(Float.valueOf(kpi_values_[i]) * scale) / scale;
						if (i < (kpi_values_.length - 1)) {
						    writer.append(String.valueOf(result) + ";");
						} else { writer.append(String.valueOf(result)); }    
					}
					writer.append('\n');
				}
				kpiNumInOrder++;
			}
            writer.flush();
		 } catch(IOException ex) { 
			 System.out.println(ex.getMessage()); 
		 } 
		return txt_file;
	}
	
	private void printCell(HSSFRow row, HSSFCell cell)
	{
		DataFormatter formatter = new DataFormatter();
		CellReference cellRef = new CellReference(row.getRowNum(),
                                                  cell.getColumnIndex());
		System.out.print(cellRef.formatAsString());
		System.out.print(" : ");

		// get the text that appears in the cell by getting 
		// the cell value and applying any data formats
		// (Date, 0.00, 1.23e9, $1.23, etc)
		String text = formatter.formatCellValue(cell);
		System.out.print(text + " / ");
		
		// Output the value to the console
		switch (cell.getCellType()) {
		case STRING:
			System.out.println(cell.getRichStringCellValue().getString());
			break;
		case NUMERIC:
			if (DateUtil.isCellDateFormatted(cell))
				System.out.println(cell.getDateCellValue());
			else
				System.out.println(cell.getNumericCellValue());
			break;
		case BOOLEAN:
			System.out.println(cell.getBooleanCellValue());
			break;
		case FORMULA:
			System.out.println(cell.getCellFormula());
			break;
		case BLANK:
			System.out.println();
			break;
		default:
			System.out.println();
		}
	}
	
	private String readCell(HSSFRow row, HSSFCell cell) {
		String st = "";
		switch (cell.getCellType()) {
		case STRING:
			st = st + cell.getRichStringCellValue().getString() + ">>";	
			break;
		case NUMERIC:
			if (DateUtil.isCellDateFormatted(cell))
				st = st + cell.getDateCellValue().toString() + ">>";
			else
				st = st + String.valueOf(cell.getNumericCellValue()) + ">>";
			break;
		case BOOLEAN:
			st = st + String.valueOf(cell.getBooleanCellValue()) + ">>";
			break;
		case FORMULA:
			//st = st + cell.getCellFormula().toString() + ">>";
			switch (cell.getCachedFormulaResultType()) {
			case BOOLEAN:
				st = st + cell.getBooleanCellValue() + ">>"; break;
			case NUMERIC:
				st = st + cell.getNumericCellValue() + ">>"; break;
			case STRING:
				st = st + cell.getStringCellValue() + ">>"; break;
			case BLANK:
				st = st + "null>>"; break;
			case ERROR:
				st = st + "null>>"; break;
			} 
			break;
		case BLANK:
			st = "null>>";
			break;
		default:
			st = "null>>";
		}	
		return st ;
	}

}
