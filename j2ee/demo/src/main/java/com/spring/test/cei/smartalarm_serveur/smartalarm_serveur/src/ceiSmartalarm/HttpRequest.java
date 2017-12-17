package com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class HttpRequest {

	public static boolean sendJsonFile(String destination, JSONObject information) throws JSONException, IOException {

		URL url = new URL(destination);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		conn.setUseCaches(false);
		conn.setDoInput(true);
		conn.setDoOutput(true);

		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type","application/json");

		OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
		wr.write(information.toString());
		wr.flush();
		wr.close();

		int responseCode = conn.getResponseCode();

		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		if(responseCode==200)
			return true;
		return false;

	}
	
	
	public static boolean sendNotifToMobile(String clientToken, String msgTitle, String msgBody) throws JSONException, IOException {
		String serverKey = "AAAA-5-GyPI:APA91bH4ChmStHKunD9q2tMn3bk8zFj2i00BookiMzDHgWhy2ThBRr_vi7LV6ZnjJpbbPIpQZAb_fhGCTla0E29Q7ujfRwVsB1R2PbHYdjw-8OJcyrukgoRv776xKC-T_kCLOKAKSDltz2AZhWoIrfEQA1YEwbktXQ";
		URL url = new URL("https://fcm.googleapis.com/fcm/send");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		conn.setUseCaches(false);
		conn.setDoInput(true);
		conn.setDoOutput(true);

		conn.setRequestMethod("POST");
		conn.setRequestProperty("Authorization","key="+serverKey);
		conn.setRequestProperty("Content-Type","application/json");

		JSONObject json = new JSONObject();
		json.put("to",clientToken);
		JSONObject info = new JSONObject();
		info.put("title", msgTitle);   // Notification title
		info.put("body", msgBody); // Notification body
		json.put("notification", info);

		OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
		wr.write(json.toString());
		wr.flush();
		wr.close();

		int responseCode = conn.getResponseCode();

		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		if(responseCode==200)
			return true;
		return false;

	}
	public static void sendMail(String destination) {

	    final String username = "cei.smartalarm@gmail.com";
	    final String password = "ceisupelec2016";
	    
	    Properties props = new Properties();
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.host", "smtp.gmail.com");
	    props.put("mail.smtp.port", "587");

	    Session session = Session.getInstance(props,
	      new javax.mail.Authenticator() {
	        protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(username, password);
	        }
	      });

	    try {

	        Message message = new MimeMessage(session);
	        message.setFrom(new InternetAddress(username));
	        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destination));
	        message.setSubject("Testing Subject");
	        message.setText("Dear Mail Crawler,"
	            + "\n\n No spam to my email, please!");

	        Transport.send(message);

	        System.out.println("Done");

	    } catch (MessagingException e) {
	        throw new RuntimeException(e);
	    }
	}
}