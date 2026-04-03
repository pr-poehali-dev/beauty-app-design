import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event: dict, context) -> dict:
    """Возвращает список всех мастеров салона из базы данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(f"""
        SELECT
            id,
            name,
            role,
            experience_years,
            specializations,
            rating,
            reviews_count,
            avatar_initial,
            is_available,
            bio,
            photo_url
        FROM {schema}.masters
        ORDER BY rating DESC, reviews_count DESC
    """)

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    masters = []
    for row in rows:
        masters.append({
            'id': row['id'],
            'name': row['name'],
            'role': row['role'],
            'experienceYears': row['experience_years'],
            'specializations': row['specializations'] or [],
            'rating': float(row['rating']),
            'reviewsCount': row['reviews_count'],
            'avatarInitial': row['avatar_initial'].strip() if row['avatar_initial'] else '',
            'isAvailable': row['is_available'],
            'bio': row['bio'],
            'photoUrl': row['photo_url'],
        })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'masters': masters}, ensure_ascii=False)
    }
