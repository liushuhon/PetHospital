package util;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ListMapHander implements ResultSetHandler{
	public Object doHander(ResultSet rs) throws Exception {
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		
		ResultSetMetaData resultSetMetaData =  rs.getMetaData();
		
		int cols = resultSetMetaData.getColumnCount();
		
		HashMap<String, Object> hashMap = null;
		
		while(rs.next()){
		
			hashMap = new HashMap<String, Object>();
		
			for (int i = 1; i <= cols; i++) {
				hashMap.put(resultSetMetaData.getColumnLabel(i), rs.getObject(i)); 
			
			}
		
			result.add(hashMap);
			
		}
		return result;
	}
}
