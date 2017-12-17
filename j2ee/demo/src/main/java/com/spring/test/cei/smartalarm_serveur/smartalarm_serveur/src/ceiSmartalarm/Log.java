package com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm;
import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;


//A logger to register all events
public class Log { 
	
	static Logger logger;

    static {  
		try {
			logger = Logger.getLogger("logger"); 
	        FileHandler fileHandlerInfo;
	        fileHandlerInfo = new FileHandler("Log.log",true);
	        fileHandlerInfo.setLevel(Level.ALL); 
	        fileHandlerInfo.setFormatter(new SimpleFormatter());; 
	        logger.addHandler(fileHandlerInfo);
		} catch (SecurityException | IOException e) {
			e.printStackTrace();
		} 
    }
    
	
    public static void info(String message) throws IOException { 
    	logger.log(Level.INFO, message);
    } 
    public static void err(String message) throws IOException { 
    	logger.log(Level.WARNING, message);
    } 
    public static void log(Level Level, String message) throws IOException { 
    	logger.log(Level, message);
    }
    
}