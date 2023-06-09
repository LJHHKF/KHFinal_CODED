package kh.coded.controllers;

import kh.coded.config.Settings;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.services.FeedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.TodayWeatherDTO;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

    @Autowired
    private FeedPostService feedpostService;

    @GetMapping("/selectfeedlisttestscroll/")
    public ResponseEntity<?> selectFeedList(
            @RequestParam(value = "cpage", required = false, defaultValue = "1")
            int cpage) {
//        List<FeedPostDTO> list = feedPostService.selectTestFeedList();
        List<FeedPostDTO> list = feedpostService.selectTestScrollFeedList(cpage);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/selectfeedlist/")
    public String selectFeedList(){
        List<FeedPostDTO> list = feedpostService.selectTestFeedList();
        return "";
    }

	@PutMapping("/insertfeedpost")
	public String insertFeedPost(FeedPostDTO fdto, HashTagDTO hdto, PhotoDTO pdto) {
		feedpostService.insertFeedPost(fdto);
		feedpostService.insertHashTag(hdto.getHashTag());
		feedpostService.insertFeedPhoto(pdto);
		return "";
	}
}
