package com.spring.test;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm.ConnectionNetatmo;
import com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm.Log;
import com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm.Server;






import java.net.ServerSocket;
import java.net.Socket;

@SpringBootApplication
public class HomeGuardianApplication implements CommandLineRunner {	
	
	public static void main(String[] args) {
		SpringApplication.run(HomeGuardianApplication.class, args);
		
		
	}

	public void run(String... arg0) throws Exception {
		// TODO Auto-generated method stub
		//adresee where Netatmo will send the information
		int port = 8081;
		String webHook = "http://43.ip-51-255-41.eu:"+port + "/api/netatmo";

		ConnectionNetatmo camera = new ConnectionNetatmo();
		camera.dropWebhook();
		camera.addWebhook(webHook);


		ServerSocket server = new ServerSocket(port);  
		Log.info("Server started, listening on port : "+ port);
		System.out.println("Server started, listening on port : "+ port);

		Socket client = null;  
		boolean serverOn = true;  
		
		//listen to thr port
		while(serverOn){  
			client = server.accept();  
			Log.info(client.getInetAddress() + ":" +client.getPort() + "New connection accepted." );
			System.out.println("New connection accepted : " + client.getInetAddress() + ":" +client.getPort());  
			
			//A new thread to process the request
			new Thread(new Server(client)).start();  
		}  
		server.close();
	}
}

