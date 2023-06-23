package kh.coded.dto;

import java.security.Timestamp;

public class FeedPostAddDTO {
	private int feedPostId;
	private int userNo;
	private String body;
	private Timestamp writeDate;
	private int writeTemp;
	private int writeTempRange;
	
	private String userNickName;
	private String profileSysName;
	private String thumbNailSysName;
	private String likeCount;
	public FeedPostAddDTO() {
		super();
	}

	public FeedPostAddDTO(int feedPostId, int userNo, String body, Timestamp writeDate, int writeTemp,
			int writeTempRange, String userNickName, String profileSysName, String thumbNailSysName, String likeCount) {
		super();
		this.feedPostId = feedPostId;
		this.userNo = userNo;
		this.body = body;
		this.writeDate = writeDate;
		this.writeTemp = writeTemp;
		this.writeTempRange = writeTempRange;
		this.userNickName = userNickName;
		this.profileSysName = profileSysName;
		this.thumbNailSysName = thumbNailSysName;
		this.likeCount = likeCount;
	}

	public int getFeedPostId() {
		return feedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		this.feedPostId = feedPostId;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public Timestamp getWriteDate() {
		return writeDate;
	}
	public void setWriteDate(Timestamp writeDate) {
		this.writeDate = writeDate;
	}
	public int getWriteTemp() {
		return writeTemp;
	}
	public void setWriteTemp(int writeTemp) {
		this.writeTemp = writeTemp;
	}
	public int getWriteTempRange() {
		return writeTempRange;
	}
	public void setWriteTempRange(int writeTempRange) {
		this.writeTempRange = writeTempRange;
	}
	public String getUserNickName() {
		return userNickName;
	}
	public void setUserNickName(String userNickName) {
		this.userNickName = userNickName;
	}
	public String getProfileSysName() {
		return profileSysName;
	}
	public void setProfileSysName(String profileSysName) {
		this.profileSysName = profileSysName;
	}
	public String getThumbNailSysName() {
		return thumbNailSysName;
	}
	public void setThumbNailSysName(String thumbNailSysName) {
		this.thumbNailSysName = thumbNailSysName;
	}
	public String getLikeCount() {
		return likeCount;
	}
	public void setLikeCount(String likeCount) {
		this.likeCount = likeCount;
	}
	
	
}