package com.ceojun7.wooricalendar.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ceojun7.wooricalendar.model.ShareEntity;

/**
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : ShareRepository.java
 * @author : 박현민
 * @date : 2023.06.05
 * @description :
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.06.05 박현민 최초 생성
 */

@Repository
public interface ShareRepository extends JpaRepository<ShareEntity, Long> {
//  List<ShareEntity> findByCalNo(Long calNo);

//  List<ShareEntity> findByEmail(String email);
}
