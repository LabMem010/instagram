from instagram import app, db
from flask_script import Manager
from sqlalchemy import or_, and_
from instagram.models import User, Image, Comment
import random, unittest

manager = Manager(app)


def get_image_url():
    return 'http://images.nowcoder.com/head/' + str(random.randint(0, 1000)) + 'm.png'


@manager.command
def init_database():
    db.drop_all()
    db.create_all()
    for i in range(0, 100):
        db.session.add(User("User" + str(i+1), "a"+str(i+1)))
        for j in range(0, 10):
            db.session.add(Image(get_image_url(), i + 1))
            for k in range(0, 3):
                db.session.add(Comment('This is a comment' + str(k), 1 + 10 * i + j, i + 1))
    db.session.commit()

    for i in range(50, 100, 2):
        user = User.query.get(i)
        user.username = '[New1]' + user.username

    User.query.filter_by(id=51).update({'username': '[New2]'})
    db.session.commit()

    for i in range(50, 100, 2):
        comment = Comment.query.get(i + 1)
        db.session.delete(comment)
    db.session.commit()


if __name__ == "__main__":
    manager.run()







