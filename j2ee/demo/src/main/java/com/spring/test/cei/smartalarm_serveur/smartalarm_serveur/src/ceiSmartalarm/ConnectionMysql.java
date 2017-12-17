package com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ConnectionMysql {
	 static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	String HOST;
	String DATABASE;
	String USER;
	String PASS;

	Connection conn;
	Statement stmt;
	ResultSet rs;


	public ConnectionMysql() throws IOException{
		this.HOST = "jdbc:mysql://localhost";
		this.DATABASE = "cei";
		this.USER = "root";
		this.PASS = "";

		conn = null;
		stmt = null;
		rs = null;
	}

	public ConnectionMysql(String fileName) throws IOException{
		FileInputStream fstream = new FileInputStream(fileName);
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		String strLine;
		while ((strLine = br.readLine()) != null)   {
			String type = strLine.split(":")[0];
			String content = strLine.split("::")[1];
			if(type.equalsIgnoreCase("host"))	{this.HOST = "jdbc:mysql://"+content;	continue;}
			if(type.equalsIgnoreCase("database"))	{this.DATABASE = content;	continue;}
			if(type.equalsIgnoreCase("username"))	{this.USER = content;	continue;}
			if(type.equalsIgnoreCase("password"))	{this.PASS = content;	continue;}
		}
		br.close();
		conn = null;
		stmt = null;
		rs = null;
	}

	public ConnectionMysql(String host, String database, String user, String pass){
		this.HOST = "jdbc:mysql://"+host  ;
		this.DATABASE = database;
		this.USER = user;
		this.PASS = pass;
		conn = null;
		stmt = null;
		rs = null;
	}

	public void connect() throws ClassNotFoundException, SQLException{
		Class.forName(JDBC_DRIVER); 
		this.conn = DriverManager.getConnection(HOST+"/"+DATABASE+"?useSSL=false",USER,PASS);
		this.stmt = conn.createStatement();
	}

	public void end() throws SQLException{
		if(this.stmt != null)
			this.stmt.close();
		if(this.conn != null)
			this.conn.close();
		if(this.rs != null)
			this.rs.close();

	}

	public ResultSet querry(String sql) throws ClassNotFoundException, SQLException{
		this.rs = stmt.executeQuery(sql);
		return rs;
	}

	public void update(String sql) throws ClassNotFoundException, SQLException{
		stmt.executeUpdate(sql);
	}
	
	public void insertServerHsitory(String method,String source, String userAgent, String contentType, String content, String response) throws ClassNotFoundException, SQLException{
		String sql = "INSERT INTO `historique_serveur`(`method`, `source`, `userAgent`, `contentType`, `centent`, `response`) VALUES ('"
			+ method + "','" + source + "','" + userAgent + "','" + contentType + "','" + content + "','" + response + "')";
		connect();
		stmt.executeUpdate(sql);
		end();
//		Date date = new Date(0);
//		Historique_ServeurRepository historique_serveurRepository = null;
//		Historique_Serveur historique_serveur = (Historique_Serveur) new Historique_Serveur(date, method, source, userAgent, contentType, content, response);
//		historique_serveurRepository.save(historique_serveur);
	}

	public ResultSet getResult(){
		return this.rs;
	}

	public String getUserStatus(String name) throws ClassNotFoundException, SQLException{
		String status = "Unknown";
		connect();
		String sql = "SELECT * FROM users WHERE name="+"'"+name+"'";
		this.querry(sql);
		if(rs.next()){
			status = rs.getString("status");
		}
		end();
		return status;
//		UserRepository userRepository = null;
//		userRepository.selectuserbyname(name);
//		while(rs.next()){
//			return rs.getStatus();
//		}
	}

	public String getUserFcmToken(String name) throws ClassNotFoundException, SQLException{
		String token = "";
		connect();
		String sql = "SELECT * FROM users WHERE name="+"'"+name+"'";
		this.querry(sql);
		if(rs.next()){
			token = rs.getString("fcmToken");
		}
		end();
		return token;
		
//		UserRepository userRepository = null;
//		userRepository.selectuserbyname(name);
//		while(rs.next()){
//			return rs.getFcmToken();
//		}
	}
	public String getOwnerFcmToken() throws ClassNotFoundException, SQLException{
		String token = "";
		connect();
		String sql = "SELECT * FROM users";
		this.querry(sql);
		while(rs.next()){
			if(rs.getString("status").equals("Owner")){
				token = rs.getString("fcmToken");
				break;
			}
		}
		end();
		return token;
		
//		UserRepository userRepository = null;
//		userRepository.findAll();
//		while(rs.next()){
//			if(rs.getStatus() == "Owner")
//				return rs.getFcmToken();
//		}
		
	}

	public String getOwnerName() throws ClassNotFoundException, SQLException{
		String name = "";
		connect();
		String sql = "SELECT * FROM users";
		this.querry(sql);
		while(rs.next()){
			if(rs.getString("status").equals("Owner")){
				name = rs.getString("name");
				break;
			}
		}
		end();
		return name;
		
//		UserRepository userRepository = null;
//		userRepository.findAll();
//		while(rs.next()){
//			if(rs.getStatus() == "Owner")
//				return rs.getName();
//		}
	}
}
