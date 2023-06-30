package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import kh.coded.dto.DMDTO;
import kh.coded.dto.DMRoomListDTO;
import kh.coded.services.DMRoomService;
import kh.coded.services.DMRoomUserService;
import kh.coded.services.DMService;


@RestController
@RequestMapping("/DM/")
public class ChatController {

	

	@Autowired
	private DMRoomService DMRoomService;

	@Autowired
	private DMService DMService;

	@Autowired
	private DMRoomUserService DMRoomUserService;

	// -- DM 관련 DB 작업 --

	// UserNo를 통한 DMRoomListDTO(로그인사용자와 대화중인 상대방의 id, nickname, 사진 등) 데이터 얻어오기
	@GetMapping("selectChatList")
	public ResponseEntity<?> selectChatList (@RequestParam(value = "userNo") int userNo){
		System.out.println("채팅 참가자 조회"+userNo);
		try {
			List<DMRoomListDTO> list = DMRoomService.selectByUserNo(userNo);
			System.out.println(list);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	// 채팅방번호를 통한 채팅내역 불러오기
	@GetMapping("selectDMbyRoomid")
	public ResponseEntity<?> selectDMbyRoomid (@RequestParam(value = "roomId") int roomId){
		List<DMDTO> list = DMService.selectDMbyRoomid(roomId);
		return ResponseEntity.ok().body(list);
		
	}


	
	
	
	
	
}