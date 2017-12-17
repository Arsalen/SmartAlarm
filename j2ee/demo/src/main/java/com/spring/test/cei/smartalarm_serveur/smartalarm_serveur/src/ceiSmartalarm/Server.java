package com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.util.StringTokenizer;

import org.json.JSONObject;

public class Server implements Runnable {

	private Socket client = null;
	private String infoClient = "";
	
	public Server(Socket client){
		this.client = client;
		infoClient = client.getInetAddress() + ":" +client.getPort();
	}

	public void run() {
		try{
			InputStream is = client.getInputStream();
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader input = new BufferedReader(isr);
			PrintStream out = new PrintStream(client.getOutputStream());

			String line = input.readLine();
			String method = new StringTokenizer(line).nextElement().toString();
			String source = line.split(" ")[1];	
			String contentString= "";
			int contentLength = 0;
			String contentType = " ";
			boolean isJson = false;
			String userAgent = "";
			String rs = "HTTP 200 Destination not found.";
			
			while(!line.isEmpty()){
				System.out.println(line);
				if (line.startsWith("Content-Length")) 
					contentLength = Integer.parseInt(line.split(":")[1].trim());   
				if (line.startsWith("Content-Type: application/json")) {
					isJson = true;
					contentType = line.split(":")[1];
				}
				if (line.startsWith("User-Agent:")) 
					userAgent = line.split(":")[1];
				line = input.readLine();
			}

			if(source.equals("/api/netatmo")&&method.equals("POST")){
				for(int i=0;i < contentLength ; i++)
					contentString = contentString +(char)input.read();
				JSONObject event = new JSONObject(contentString);
				rs = ProcessingEvent.processNetatmoEvent(event);
				
			}else if(source.equals("/api/connexion")&&method.equals("POST")){
				for(int i=0;i < contentLength ; i++)
					contentString = contentString +(char)input.read();
				if(isJson){
					JSONObject event = new JSONObject(contentString);
					rs = ProcessingEvent.Connexion(event);
				}else{
					rs = ProcessingEvent.Connexion(contentString);
				}
			}else if(source.equals("/api/deconnexion")&&method.equals("POST")){
				for(int i=0;i < contentLength ; i++)
					contentString = contentString +(char)input.read();
				if(isJson){
					JSONObject event = new JSONObject(contentString);
					rs = ProcessingEvent.Deconnexion(event);
				}else{
					rs = ProcessingEvent.Deconnexion(contentString);
				}
				
			}else if(source.equals("/api/updateFCM")&&method.equals("POST")){
				for(int i=0;i < contentLength ; i++)
					contentString = contentString +(char)input.read();
				if(isJson){
					JSONObject event = new JSONObject(contentString);
					rs = ProcessingEvent.updateFcmToken(event);
				}else{
					rs = ProcessingEvent.updateFcmToken(contentString);
				}
			}else if((source.equals("/api/action")||source.equals("/api/action/"))&&method.equals("POST")){
				for(int i=0;i < contentLength ; i++)
					contentString = contentString +(char)input.read();
				if(isJson){
					JSONObject event = new JSONObject(contentString);
					rs = ProcessingEvent.doAction(event);
				}else{
					rs = ProcessingEvent.doAction(contentString);
				}
			}else if((source.equals("")||source.equals("/"))&&method.equals("POST")){
				for(int i=0;i < contentLength ; i++)
					contentString = contentString +(char)input.read();
				if(isJson){
					JSONObject event = new JSONObject(contentString);
					rs = ProcessingEvent.ProcessRequest(event);
				}else{
					rs = ProcessingEvent.ProcessRequest(contentString);
				}
			}
			
			Log.info(infoClient + " Request content:" + contentString);
			Log.info(infoClient + " Response of server:" + rs);
			out.println(rs); 
			out.println();
			
			ConnectionMysql database = new ConnectionMysql();
			database.insertServerHsitory(method, source, userAgent, contentType, contentString, rs);
			Log.info(infoClient + " Connexion ended and recorded.");
			
			out.close();
			input.close();
			client.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}
