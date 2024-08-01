package fuel.retail;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.WorkbookFactory;


public class Main {

	private	static String  FILE = "\\\\aup-fs\\ivc\\a.ekimenko\\Расчет надбавок на топливо.xls";
	
	private	File txt_file = null;
	public void setTxtFile(File f) { this.txt_file = f;}
	public File getTxtFile() { return this.txt_file;}
	
	private HSSFWorkbook   book;
	private HSSFSheet      sheet;
	private FormulaEvaluator evaluator;
	
	private Map<Integer, String> DateOfRow; 
	private int PreviousRowWithDate;
	private String CellValue;
	private DateFormat df;
	private ArrayList<String> ListOfRows;
	double scale = Math.pow(10, 2);
	double scale_p = Math.pow(10, 1);
	Pattern DateRegExPattern;
	Matcher RegExMatcher;
	
	String st;
	String XlsContent;
	
	public Main(String FILE) {
		Main.FILE = FILE;
		new Main();
	}
	
	public Main()
	{
		DateOfRow = new HashMap<Integer, String> (); 
		df = new SimpleDateFormat("yyyyMMdd");
		DateRegExPattern = Pattern.compile("\\d{8}");
		ListOfRows = new ArrayList<String> ();

		try { openBook(FILE);} 
		catch (InvalidFormatException e1) {	e1.printStackTrace(); }
		if (book != null) {
			evaluator = book.getCreationHelper().createFormulaEvaluator();
			//curr_date = new Date();
			//frmtDate = new SimpleDateFormat("yyyy");
			//sheet = book.getSheet("План_" + frmtDate.format(curr_date) + " ПОН");
			sheet = book.getSheet("Лист22");
			if (sheet != null) {
				readCells();
				//readCells_v3();
			} else {
				System.out.println ("Excel sheet not found");
			}
			try { book.close();	} 
			catch (IOException e) {	e.printStackTrace(); }
		} else System.out.println ("Error reading Excel file");
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
	
	private void readCells()
	{
		// Defining boundary processing lines
		int rowStart = Math.min(  0, sheet.getFirstRowNum());
		PreviousRowWithDate = rowStart; 
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
		    
		    //if ( !DateOfRow.containsKey(Integer.valueOf(rw)) ) DateOfRow.put(Integer.valueOf(rw), null);
		    
			short minCol = row.getFirstCellNum();
			short maxCol = row.getLastCellNum();
			for(short col = minCol; col < maxCol; col++) {
				// @SuppressWarnings("deprecation")
				// XSSFCell cell = rw.getCell(col, XSSFRow.RETURN_BLANK_AS_NULL);
				//XSSFCell cell = row.getCell(col);
				HSSFCell cell = row.getCell(col);
				if (cell == null) {
				    	System.out.println("cell '" + col + "' is not created");
				        continue;
				 }
				 //printCell(row, cell);
				 CellValue = readCell(row, cell);
				 if (cell.getAddress().toString().substring(0,1).equals("A")) {
					 if (!CellValue.contains("blank")) { 
						 RegExMatcher = DateRegExPattern.matcher(CellValue);
						 if (RegExMatcher.find()) {
							PreviousRowWithDate = rw; 
						    DateOfRow.put(Integer.valueOf(rw), CellValue);
						    XlsContent = XlsContent + CellValue + ";";
						 }
					 } else XlsContent = XlsContent + DateOfRow.get(Integer.valueOf(PreviousRowWithDate)) + ";";
				 } else XlsContent = XlsContent + CellValue + ";";
		    }
			ListOfRows.add(XlsContent.replaceAll("blank", ""));
			XlsContent = "";
		}
		
        
		for(String st: ListOfRows) {
			System.out.print (st);
		}
		setTxtFile(writeToTXT());
		
		/*for(Map.Entry<Integer, String> entry :DateOfRow.entrySet()) {
			System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
		}*/
	}

	private String readCell(HSSFRow row, HSSFCell cell) {
		String st = "";
		//if (cell != null) {
		switch (cell.getCellType()) {
		case STRING:
			st = st + cell.getRichStringCellValue().getString();	
			break;
		case NUMERIC:
			if (DateUtil.isCellDateFormatted(cell)) 
				st = st + df.format(cell.getDateCellValue()).toString();
			else 
				if ((cell.getCellStyle().getDataFormatString()).contains("0.0%")) {
					 st = st + String.valueOf(Math.ceil(cell.getNumericCellValue() * 100 * scale_p) / scale_p);
				} else st = st + String.valueOf(Math.ceil(cell.getNumericCellValue() * scale) / scale);
			break;
		case BOOLEAN:
			st = st + String.valueOf(cell.getBooleanCellValue());
			break;
		case FORMULA:
			//st = st + cell.getCellFormula().toString() + ">>";
			switch (cell.getCachedFormulaResultType()) {
			case BOOLEAN:
				st = st + cell.getBooleanCellValue(); break;
			case NUMERIC: 
				if ((cell.getCellStyle().getDataFormatString()).contains("0.0%")) 
				   // So that, for example - 0.025 is displayed as 2.5	
				   st = st + String.valueOf(Math.ceil(cell.getNumericCellValue() * 100 * scale_p) / scale_p);
				else 
				   st = st + String.valueOf(Math.ceil(cell.getNumericCellValue() * scale) / scale);
				break;
			case STRING:
				st = st + cell.getStringCellValue(); break;
			case BLANK:
				st = st + "blank"; break;
			case ERROR:
				st = st + "error"; break;
			} 
			break;
		case BLANK:
			st = "blank"; break;
		//default: st = ""; 
		}	
		return st ;
		//} else return "";
	}
	
	private File writeToTXT ()  {		
		String txtFileName = "FuelSurchargesCalculation.txt"; 
		//File txt_file = new File("\\\\AUP-FS\\Ivc\\a.ekimenko", txtFileName);
		this.setTxtFile(new File("\\\\AUP-FS\\Ivc\\a.ekimenko", txtFileName)); 		
		System.out.println(txtFileName + " - " + txt_file.getAbsolutePath().toString());
		try(Writer writer = new BufferedWriter( new OutputStreamWriter(new FileOutputStream(
				txt_file), "UTF-8"))) {
			for (String st: ListOfRows) { 
				writer.append(st + '\n');
				System.out.println(st + '\n'); 			
			}
            writer.flush();
		 } catch(IOException ex) { 
			 System.out.println(ex.getMessage()); 
		 } 
		 return txt_file;
	}
	
	public static void main(String[] args) {
		new Main();
		System.exit(0);
	}

}
