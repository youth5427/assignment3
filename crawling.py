import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
import pymysql

def crawl_saramin(keyword, pages=1):
    jobs = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    for page in range(1, pages + 1):
        time.sleep(1)
        url = f"https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword={keyword}&recruitPage={page}"

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            job_listings = soup.select('.item_recruit')

            for job in job_listings:
                try:
                    company = job.select_one('.corp_name a').text.strip()
                    title = job.select_one('.job_tit a').text.strip()
                    link = 'https://www.saramin.co.kr' + job.select_one('.job_tit a')['href']

                    conditions = job.select('.job_condition span')
                    location = conditions[0].text.strip() if len(conditions) > 0 else ''
                    experience = conditions[1].text.strip() if len(conditions) > 1 else ''
                    education = conditions[2].text.strip() if len(conditions) > 2 else ''
                    employment_type = conditions[3].text.strip() if len(conditions) > 3 else ''
                    deadline = job.select_one('.job_date .date').text.strip()
                    sector = job.select_one('.job_sector').text.strip() if job.select_one('.job_sector') else ''
                    salary = conditions[4].text.strip() if len(conditions) > 4 else '정보 없음'

                    jobs.append({
                        '회사명': company,
                        '제목': title,
                        '링크': link,
                        '지역': location,
                        '경력': experience,
                        '학력': education,
                        '고용형태': employment_type,
                        '마감일': deadline,
                        '직무분야': sector,
                        '연봉정보': salary,
                        '관심기업정보': '정보 없음',
                        '조회수': 0
                    })

                except AttributeError as e:
                    print(f"항목 파싱 중 에러 발생: {e}")
                    continue

            print(f"{page}페이지 크롤링 완료")
            time.sleep(1)

        except requests.RequestException as e:
            print(f"페이지 요청 중 에러 발생: {e}")
            continue

    return jobs

def save_to_mariadb(jobs, host, user, password, port, database):
    """
    크롤링 데이터를 MariaDB에 저장하는 함수

    Args:
        jobs (list): 크롤링한 채용공고 데이터 리스트
        host (str): MariaDB 호스트
        user (str): MariaDB 사용자 이름
        password (str): MariaDB 비밀번호
        port (int): MariaDB 포트
        database (str): MariaDB 데이터베이스 이름
    """
    connection = pymysql.connect(
        host=host,
        user=user,
        password=password,
        port=port,
        database=database,
        charset='utf8mb4'
    )

    try:
        with connection.cursor() as cursor:
            # 테이블 생성
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS job_posting (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    company VARCHAR(255),
                    title VARCHAR(255),
                    link TEXT,
                    location VARCHAR(255),
                    experience VARCHAR(255),
                    education VARCHAR(255),
                    employment_type VARCHAR(255),
                    deadline VARCHAR(255),
                    sector VARCHAR(255),
                    salary VARCHAR(255),
                    views INT
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            ''')
            
            # companies 테이블 생성
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS companies (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    company VARCHAR(255),
                    interest_info VARCHAR(255),  -- 관심기업 정보 추가
                    views INT
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            ''')
            
            # 데이터 삽입
            for job in jobs:
                cursor.execute('''
                    INSERT INTO job_posting (
                        company, title, link, location, experience, education, employment_type, deadline, sector, salary, views
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ''', (
                    job['회사명'], job['제목'], job['링크'], job['지역'],
                    job['경력'], job['학력'], job['고용형태'], job['마감일'],
                    job['직무분야'], job['연봉정보'], job['조회수']
                ))
                
                # companies 데이터 삽입 (링크와 상세 설명만 추가)
                
                cursor.execute('''
                    INSERT INTO companies (
                        company, interest_info, views
                    ) VALUES (%s, %s, %s)
                ''', (
                    job['회사명'], job['관심기업정보'], job['조회수']
                ))

        connection.commit()
        print("데이터가 MariaDB에 성공적으로 저장되었습니다.")

    finally:
        connection.close()

if __name__ == "__main__":
    # 'python' 키워드로 3페이지 크롤링
    jobs = crawl_saramin('', pages=6)
    
    # MariaDB에 저장
    save_to_mariadb(
        jobs,
        host='113.198.66.75',
        user='root',
        password='0831',
        port=13246,
        database='ysh'
    )
