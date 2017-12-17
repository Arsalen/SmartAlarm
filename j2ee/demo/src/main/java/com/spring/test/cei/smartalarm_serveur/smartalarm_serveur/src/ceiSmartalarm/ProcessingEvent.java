package com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;



public class ProcessingEvent {

	public static String processNetatmoEvent(JSONObject event) throws JSONException, ClassNotFoundException, SQLException, IOException{
		String typeEvent = event.getString("event_type");
		//System.out.println(typeEvent);
		if(typeEvent.equals("person")){
			return recognicePerson(event);
		}

		return "Event type not found";
	}

	public static String recognicePerson(JSONObject event) throws ClassNotFoundException, JSONException, SQLException, IOException{

		ConnectionMysql c = new ConnectionMysql();

		String message = event.getString("message");
		String personName = message.split(" ")[0];
		String personStatus = c.getUserStatus(personName);
		if(personStatus.equals("Owner")){ 
			String clientToken = c.getUserFcmToken(personName);
			processOwner(personName,clientToken);
			//System.out.println(clientToken);
			Log.info(personName+ " has been authentified.");
			return "HTTP/1.1 200 HTTP OK";
		}			
		if(personStatus.equals("Family") || personStatus.equals("Friend")){
			String clientToken = c.getUserFcmToken(personName);
			String ownerToken = c.getOwnerFcmToken();
			processKnown(personName,clientToken,ownerToken);
			return "HTTP/1.1 200 HTTP OK";
		}
		if(personStatus.equals("Unknown")){
			String ownerToken = c.getOwnerFcmToken();
			processUnknown(ownerToken);
			return "HTTP/1.1 200 HTTP OK";
		}
		return "Operation not found";
	}

	public static void processOwner(String name, String clientToken) throws JSONException, IOException{
		//System.out.println(name+", you're the owner.");
		Log.info(name+", you're the owner.");
		if(!clientToken.equals("")){
			String msgTitle = "Bonjour!";
			String msgBody = name+ " has been authentified.";
			if(HttpRequest.sendNotifToMobile(clientToken, msgTitle, msgBody))
				Log.info("Send notif to mobile succeed.  "+ name);
				//System.out.println("Success!");
			else
				Log.err("Send notif to mobile failed.  "+ name);
				//System.out.println("Failed!");
			return;
		}
		Log.info("Owner is not connected.  " + name);
		//System.out.println("Owner is not connected");
	}

	public static void processKnown(String name,String clientToken,String ownerToken) throws JSONException, IOException{
		Log.info(name+", you're a family member.");
		//System.out.println(name+", you're a family member.");
		String msgTitle = "Bonjour!";
		String msgBody = name+ " has entered your appartment.";

		if(!ownerToken.equals("")){
			if(HttpRequest.sendNotifToMobile(ownerToken, msgTitle, msgBody))
				Log.info("Send notif to owner succeed.  ");
				//System.out.println("Send notification to owner succeeded.");
			else
				Log.err("Send notif to owner failed.  ");
				//System.out.println("Send notification to owner Failed!");
		}

		if(!clientToken.equals("")){
			if(HttpRequest.sendNotifToMobile(clientToken, msgTitle, msgBody))
				Log.err("Send notif to mobile succeeded.  "+ name);
				//System.out.println("Send notification to family succeeded.");
			else
				Log.err("Send notif to mobile failed.  "+ name);
				//System.out.println("Send notification to family Failed!");
		}
	}

	public static void processUnknown(String ownerToken) throws JSONException, IOException{
		Log.info("You're not recogonized.");
		//System.out.println("You're not recogonized.");
		String msgTitle = "Attention!";
		String msgBody = "An unknown person has entered your appartment.";
		if(!ownerToken.equals("")){
			if(HttpRequest.sendNotifToMobile(ownerToken, msgTitle, msgBody))
				Log.err("Send notif to owner succeeded.  ");
				//System.out.println("Send notification to owner succeeded.");
			else
				Log.err("Send notif to owner failed.  ");
				//System.out.println("Send notification to owner Failed!");
		}
	}

	public static void processUnknownFollowing() throws JSONException, IOException{
		//needs to be implemented
	}
	
	public static String ProcessRequest(String event) throws JSONException, IOException, ClassNotFoundException, SQLException{
		String[] aa = event.split("&");
		String[] aa0 = aa[0].split("=");
		if(!aa0[0].equals("event_type"))
			return "HTTP/1.1 200 IncorrectDataFormat";
		String typeEvent = aa0[1];
		if(typeEvent.equals("connexion"))
			return Connexion(event);
		if(typeEvent.equals("deconnexion"))
			return Deconnexion(event);
		if(typeEvent.equals("updateFcmToken"))
			return updateFcmToken(event);
		if(typeEvent.equals("doAction"))
			return doAction(event);
		
		return "HTTP/1.1 200 IncorrectDataFormat";
	}
	
	public static String ProcessRequest(JSONObject event) throws JSONException, IOException, ClassNotFoundException, SQLException{
		if(!event.has("event_type"))
			return "200 Incorrect demand body format.";
		String typeEvent = event.getString("event_type");
		if(typeEvent.equals("connexion"))
			return Connexion(event);
		if(typeEvent.equals("deconnexion"))
			return Deconnexion(event);
		if(typeEvent.equals("updateFcmToken"))
			return updateFcmToken(event);
		if(typeEvent.equals("doAction"))
			return doAction(event);
		
		return "HTTP/1.1 200 IncorrectDataFormat";
	}	
	
	public static String Connexion(JSONObject event) throws JSONException, ClassNotFoundException, SQLException, IOException{
		if(!event.has("event_type"))
			return "200 Incorrect demand body format.";
		String typeEvent = event.getString("event_type");
			if(!typeEvent.equals("connexion") || !event.has("event_type") || !event.has("admin") || !event.has("password") || !event.has("fcm"))
				return "200 Incorrect demand body format.";
			String userName = event.getString("admin");
			String password = event.getString("password");
			String pwd = "";
			String fcmToken = "cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi";

			//String fcmToken = event.getString("fcm");
			String requestConnect = "SELECT pwd FROM users WHERE users.login='"+userName+"';";
			ConnectionMysql c = new ConnectionMysql();
			c.connect();
			ResultSet rs = c.querry(requestConnect);
			if(rs.next()){
				pwd  = rs.getString("pwd");
			}
			if(pwd.equals(password)){
				String request = "UPDATE users SET fcmToken = '"+ fcmToken +"' WHERE users.login = '" + userName + "';";
				c.update(request);
				c.end();
				return "HTTP/1.1 200 authentification succeeded.";
			}
			c.end();
			return "HTTP/1.1 200 login or password incorrect";
	}

	
	public static String Connexion(String event) throws JSONException, ClassNotFoundException, SQLException, IOException{
		String[] aa = event.split("&");
		String[] aa0 = aa[0].split("=");
		if(!aa0[0].equals("event_type"))
			return "HTTP/1.1 200 IncorrectDataFormat";
		String typeEvent = aa0[1];
		if(!typeEvent.equals("connexion") || !aa[1].split("=")[0].equals("admin") || !aa[2].split("=")[0].equals("password") || !aa[3].split("=")[0].equals("fcm"))
			return "HTTP/1.1 200 IncorrectDataFormat";
		String userName = aa[1].split("=")[1];
		String password = aa[2].split("=")[1];
		String pwd = "";
		//String fcmToken = aa[3].split("=")[1];
		String fcmToken = "cHbNF1c76yc:APA91bF2j37L86mcvvv2eYmzxGbvFdAKmEn7QM9XOo--cXNfnK28jTz0VioouP-My9hLLLobUB-A14qM2dEejU3PKni4mQGeWghzcBHCKULG8g3O1QKA0RHCKp9WglH8ieGETy4CYBUi";
		String requestConnect = "SELECT pwd FROM users WHERE users.login='"+userName+"';";
		ConnectionMysql c = new ConnectionMysql();
		c.connect();
		ResultSet rs = c.querry(requestConnect);
		if(rs.next()){
			pwd  = rs.getString("pwd");
		}
		if(pwd.equals(password)){
			String request = "UPDATE users SET fcmToken = '"+ fcmToken +"' WHERE users.login = '" + userName + "';";
			c.update(request);
			c.end();
			return "HTTP/1.1 200 succeeded";
		}
		c.end();
		return "HTTP/1.1 200 LoginOrPasswordIncorrect";
	}
	
	public static String Deconnexion(JSONObject event) throws JSONException, ClassNotFoundException, SQLException, IOException{
		if(!event.has("event_type"))
			return "200 Incorrect demand body format.";
		String typeEvent = event.getString("event_type");
		if(!typeEvent.equals("deconnexion") || !event.has("admin") || !event.has("password"))
			return "200 Incorrect demand body format.";
		String userName = event.getString("admin");
		String password = event.getString("password");
		String pwd = "";
		String requestConnect = "SELECT pwd FROM users WHERE users.login='"+userName+"';";
		ConnectionMysql c = new ConnectionMysql();
		c.connect();
		ResultSet rs = c.querry(requestConnect);
		if(rs.next()){
			pwd  = rs.getString("pwd");
		}
		if(pwd.equals(password)){
			String request = "UPDATE users SET `fcmToken` = '' WHERE users.login = '" + userName + "';";
			c.update(request);
			c.end();
			return "HTTP/1.1 200 deconnexion succeeded.";
		}
		c.end();
		return "HTTP/1.1 200 login or password incorrect";
	}
	
	public static String Deconnexion(String event) throws JSONException, ClassNotFoundException, SQLException, IOException{
		String[] aa = event.split("&");
		String[] aa0 = aa[0].split("=");
		if(!aa0[0].equals("event_type"))
			return "HTTP/1.1 200 IncorrectDataFormat";
		String typeEvent = aa0[1];
		if(!typeEvent.equals("deconnexion") || !aa[1].split("=")[0].equals("admin") || !aa[2].split("=")[0].equals("password"))
			return "HTTP/1.1 200 IncorrectDataFormat";
		String userName = aa[1].split("=")[1];
		String password = aa[2].split("=")[1];
		String pwd = "";
		String requestConnect = "SELECT pwd FROM users WHERE users.login='"+userName+"';";
		ConnectionMysql c = new ConnectionMysql();
		c.connect();
		ResultSet rs = c.querry(requestConnect);
		if(rs.next()){
			pwd  = rs.getString("pwd");
		}
		if(pwd.equals(password)){
			String request = "UPDATE users SET `fcmToken` = '' WHERE users.login = '" + userName + "';";
			c.update(request);
			c.end();
			return "HTTP/1.1 200 DeconnexionSucceeded";
		}
		c.end();
		return "HTTP/1.1 200 LoginOrPasswordIncorrect";
	}
	
		public static String updateFcmToken(JSONObject event) throws JSONException, ClassNotFoundException, SQLException, IOException{
			if(!event.has("event_type"))
				return "200 Incorrect demand body format.";
			String typeEvent = event.getString("event_type");
			if(!typeEvent.equals("updateFcmToken") || !typeEvent.equals("deconnexion") || !event.has("admin") || !event.has("password"))
				return "200 Incorrect demand body format.";
			String userName = event.getString("admin");
			String password = event.getString("password");
			String pwd = "";
			String fcmToken = event.getString("fcm");
			String requestConnect = "SELECT pwd FROM users WHERE users.login='"+userName+"';";
			ConnectionMysql c = new ConnectionMysql();
			c.connect();
			ResultSet rs = c.querry(requestConnect);
			if(rs.next()){
				pwd  = rs.getString("pwd");
			}
			if(pwd.equals(password)){
				String request = "UPDATE users SET fcmToken = '"+ fcmToken +"' WHERE users.login = '" + userName + "';";
				c.update(request);
				c.end();
				return "HTTP/1.1 200 Update FCM token succeeded.";
			}
			c.end();
			return "HTTP/1.1 200 login or password incorrect";
		}
		
		public static String updateFcmToken(String event) throws JSONException, ClassNotFoundException, SQLException, IOException{
			String[] aa = event.split("&");
			String[] aa0 = aa[0].split("=");
			if(!aa0[0].equals("event_type"))
				return "HTTP/1.1 200 IncorrectDataFormat";
			String typeEvent = aa0[1];
			if(!typeEvent.equals("updateFcmToken") || !aa[1].split("=")[0].equals("admin") || !aa[2].split("=")[0].equals("password") || !aa[3].split("=")[0].equals("fcm"))
				return "HTTP/1.1 200 IncorrectDataFormat";
			String userName = aa[1].split("=")[1];
			String password = aa[2].split("=")[1];
			String pwd = "";
			String fcmToken = aa[3].split("=")[1];
			String requestConnect = "SELECT pwd FROM users WHERE users.login='"+userName+"';";
			ConnectionMysql c = new ConnectionMysql();
			c.connect();
			ResultSet rs = c.querry(requestConnect);
			if(rs.next()){
				pwd  = rs.getString("pwd");
			}
			if(pwd.equals(password)){
				String request = "UPDATE users SET fcmToken = '"+ fcmToken +"' WHERE users.login = '" + userName + "';";
				c.update(request);
				c.end();
				return "HTTP/1.1 200 UpdateFCMTokenSucceeded";
			}
			c.end();
			return "HTTP/1.1 200 LoginOrPasswordIncorrect";
		}
		
		public static String doAction(JSONObject event) throws JSONException, ClassNotFoundException, SQLException, IOException{
			if(!event.has("event_type"))
				return "200 Incorrect demand body format.";
			String typeEvent = event.getString("event_type");
			if(!typeEvent.equals("doAction") || !event.has("action"))
				return "200 Incorrect demand body format.";
			String doAction = event.getString("action");;
			System.out.println(doAction);
			String msgTitle = "Permitted!";
			String msgBody = "The event has been recorded.";
			String rt = "HTTP/1.1 200 EnterPermitted";
			if(doAction.equalsIgnoreCase("identify")){
				msgTitle = "Bonjour!";	
				msgBody = "You are authorized.";
			}
			if(doAction.equalsIgnoreCase("authorize")){
				msgTitle = "Permitted!";	
				msgBody = "The event has been recorded.";
				rt = "HTTP/1.1 200 EnterPermitted";
			}
			if(doAction.equalsIgnoreCase("intervention")){
				msgTitle = "Intervention done!";	
				msgBody = "The police is called.";
			}
			ConnectionMysql c = new ConnectionMysql();
			String ownerToken = c.getOwnerFcmToken();
			if(!ownerToken.equals("")){
				if(HttpRequest.sendNotifToMobile(ownerToken,msgTitle,msgBody ))
					Log.info("Success!" + msgTitle + "  " + msgBody);
				else
					Log.info("Failed!" + msgTitle + "  " + msgBody);
			}
			return rt;
			
		}

			
		public static String doAction(String event) throws JSONException, ClassNotFoundException, SQLException, IOException{
			String[] aa = event.split("&");
			String[] aa0 = aa[0].split("=");
			if(!aa0[0].equals("event_type"))
				return "HTTP/1.1 200 IncorrectDataFormat";
			String typeEvent = aa0[1];
			if(!typeEvent.equals("doAction") || !aa[1].split("=")[0].equals("action"))
				return "HTTP/1.1 200 IncorrectDataFormat";
			String doAction = aa[1].split("=")[1];
			System.out.println(doAction);
			String msgTitle = "Permitted!";
			String msgBody = "The event has been recorded.";
			String rt = "HTTP/1.1 200 EnterPermitted";
			if(doAction.equalsIgnoreCase("identify")){
				msgTitle = "Bonjour!";	
				msgBody = "You are authorized.";
			}
			if(doAction.equalsIgnoreCase("authorize")){
				msgTitle = "Permitted!";	
				msgBody = "The event has been recorded.";
				rt = "HTTP/1.1 200 EnterPermitted";
			}
			if(doAction.equalsIgnoreCase("intervention")){
				msgTitle = "Intervention done!";	
				msgBody = "The police is called.";
			}
			ConnectionMysql c = new ConnectionMysql();
			String ownerToken = c.getOwnerFcmToken();
			if(!ownerToken.equals("")){
				if(HttpRequest.sendNotifToMobile(ownerToken,msgTitle,msgBody ))
					Log.info("Success!" + msgTitle + "  " + msgBody);
				else
					Log.info("Failed!" + msgTitle + "  " + msgBody);
			}
			return rt;
			
		}


}