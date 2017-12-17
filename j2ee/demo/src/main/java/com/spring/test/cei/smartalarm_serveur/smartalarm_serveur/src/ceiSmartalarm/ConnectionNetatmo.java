package com.spring.test.cei.smartalarm_serveur.smartalarm_serveur.src.ceiSmartalarm;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.*;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ConnectionNetatmo {
	
	private String userName;
	private String password;
	private String clientId;
	private String clientSecret;
	private String scope;
	private String homeId;
	
	private String accessToken;
	private String refreshToken;
		
	public ConnectionNetatmo() throws IOException, JSONException{
		this.userName = "cei.smartalarm@gmail.com";
		this.password = "Ceisupelec2016";
		this.clientId = "58453d84f5459520b68b96f0";
		this.clientSecret = "YXtvPVDvc2O53LRWl2JwpOyKYzDTWNIhrgzI9ADkRN4";
		this.scope = "read_camera access_camera";
		this.homeId = "584540a36b0aff57268b9aa0";
		
		OkHttpClient client = new OkHttpClient();
		RequestBody body = new FormBody.Builder()
		        .add("grant_type", "password")
		        .add("username", this.userName)
		        .add("password", this.password)
		        .add("client_id", this.clientId)
		        .add("client_secret", this.clientSecret)
		        .add("scope", this.scope)
		        .build();
		Request request = new Request.Builder()
		        .url("https://api.netatmo.com/oauth2/token")
		        .post(body)
		        .addHeader("Content-Type", "application/x-www-form-urlencoded")
		        .build();
	    Response response = client.newCall(request).execute();
	    if (response.isSuccessful()) {
	    	//System.out.println(response.body().string());
	    	String res = response.body().string();
			JSONObject jo = new JSONObject(res);
			this.accessToken = (String) jo.get("access_token");
			this.refreshToken = (String) jo.get("refresh_token");
			System.out.println("success!");
	      } else {
	    	  System.out.println("failed!");
	          throw new IOException("Unexpected code " + response);
	      }
	    Log.info("Acess token got : "+this.accessToken);
	}


	public ConnectionNetatmo(String fileName) throws IOException, JSONException{
			
		FileInputStream fstream = new FileInputStream(fileName);
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		String strLine;
		while ((strLine = br.readLine()) != null)   {
			String type = strLine.split(":")[0];
			String content = strLine.split("::")[1];
			if(type.equalsIgnoreCase("username"))	{this.userName = content;	continue;}
			if(type.equalsIgnoreCase("password"))	{this.password = content;	continue;}
			if(type.equalsIgnoreCase("client_id"))	{this.clientId = content;	continue;}
			if(type.equalsIgnoreCase("client_secret"))	{this.clientSecret = content;	continue;}
			if(type.equalsIgnoreCase("scope"))	{this.scope = content;	continue;}
			if(type.equalsIgnoreCase("home_id"))	{this.homeId = content;	continue;}

		}
		br.close();

		OkHttpClient client = new OkHttpClient();
		RequestBody body = new FormBody.Builder()
		        .add("grant_type", "password")
		        .add("username", this.userName)
		        .add("password", this.password)
		        .add("client_id", this.clientId)
		        .add("client_secret", this.clientSecret)
		        .add("scope", this.scope)
		        .build();
		Request request = new Request.Builder()
		        .url("https://api.netatmo.com/oauth2/token")
		        .post(body)
		        .addHeader("Content-Type", "application/x-www-form-urlencoded")
		        .build();
	    Response response = client.newCall(request).execute();
	    if (response.isSuccessful()) {
	    	String res = response.body().string();
			JSONObject jo = new JSONObject(res);
			this.accessToken = (String) jo.get("access_token");
			this.refreshToken = (String) jo.get("refresh_token");
	      } else {
	          throw new IOException("Unexpected code " + response);
	      }
	    Log.info("Acess token got : "+this.accessToken);
	    //System.out.println(this.accessToken);
	}
	
	public JSONArray getEventsList(String size) throws IOException, JSONException{
		OkHttpClient client = new OkHttpClient();
		RequestBody body = new FormBody.Builder()
		        .add("access_token", this.accessToken)
		        .add("home_id", this.homeId)
		        .add("size", size)
		        .build();
		Request request = new Request.Builder()
		        .url("https://api.netatmo.com/api/gethomedata")
		        .post(body)
		        .addHeader("Content-Type", "application/x-www-form-urlencoded")
		        .build();
	    Response response = client.newCall(request).execute();
	    if (response.isSuccessful()) {
	    	String res = response.body().string();
			JSONObject jo = new JSONObject(res);
			JSONObject homes = (JSONObject) jo.getJSONObject("body").getJSONArray("homes").get(0);
			JSONArray events = homes.getJSONArray("events");
	    	return events;
	    }else{
	    	Log.err("Get events list failed, "+response.message());
	    	//System.out.println(response.message());
	    	refreshToken();
	    	return getEventsList(size);
	    }	
	}	
	
	public void refreshToken() throws IOException, JSONException{
		
		OkHttpClient client = new OkHttpClient();
		RequestBody body = new FormBody.Builder()
		        .add("grant_type", "refresh_token")
		        .add("refresh_token", this.refreshToken)
		        .add("client_id", this.clientId)
		        .add("client_secret", this.clientSecret)
		        .build();
		Request request = new Request.Builder()
		        .url("https://api.netatmo.com/oauth2/token")
		        .post(body)
		        .addHeader("Content-Type", "application/x-www-form-urlencoded")
		        .build();
	    Response response = client.newCall(request).execute();
	    if (response.isSuccessful()) {
	    	String res = response.body().string();
			JSONObject jo = new JSONObject(res);
			this.accessToken = (String) jo.get("access_token");
			this.refreshToken = (String) jo.get("refresh_token");
	     } else {
	        throw new IOException("Unexpected code " + response);
	     }	
	}
	
	public void addWebhook(String u) throws IOException, JSONException{
		OkHttpClient client = new OkHttpClient();
		RequestBody body = new FormBody.Builder()
		        .add("access_token", this.accessToken)
				.add("url", u)
		        .add("app_type", "app_camera")
		        .build();
		Request request = new Request.Builder()
		        .url("https://api.netatmo.com/api/addwebhook")
		        .post(body)
		        .addHeader("Content-Type", "application/x-www-form-urlencoded")
		        .build();
	    Response response = client.newCall(request).execute();
	    if (response.isSuccessful()) {
	    	Log.info("Add new addhook succeeded: "+u);
	    	//System.out.println("Add new addhook succeeded.");
	    }else{
	    	Log.err("Add webhook failed : "+response);
	    	//System.out.println("Add webhook failed : "+response);
	    	//System.out.println(response.message());
	    	//refreshToken();
	    	//addWebhook(port);
	    }	
	}	
	
	public void dropWebhook() throws IOException{
		OkHttpClient client = new OkHttpClient();
		RequestBody body = new FormBody.Builder()
		        .add("access_token", this.accessToken)
		        .add("app_type", "app_camera")
		        .build();
		Request request = new Request.Builder()
		        .url("https://api.netatmo.com/api/dropwebhook")
		        .post(body)
		        .addHeader("Content-Type", "application/x-www-form-urlencoded")
		        .build();
	    Response response = client.newCall(request).execute();
	    if (response.isSuccessful()) {
	    	Log.info("Drop odd webhook succeeded." );
	    	//System.out.println("Drop odd addhook succeeded." );
	    }else{
	    	Log.err("Drop webhook failed : "+response);
	    	//System.out.println("Drop addhook failed : "+response);
	    	//System.out.println(response.message());
	    	//refreshToken();
	    	//addWebhook(port);
	    }
	}
	
	public String getAccessToken(){return this.accessToken;}
	public String getRefreshToken(){return this.refreshToken;}
}
