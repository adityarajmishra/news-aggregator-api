import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { format } from 'date-fns'; // Import date-fns format function
import { filterData } from '../helpers/filetrData';
import { sendVerificationEmail } from '../routes/verification';

/**
 * User Model
 */
class User {
  static type = {
    admin: 'admin',
    other: 'normal',
  };

  user_id: string;
  user_name: string;
  user_email: string;
  password: string;
  user_type: string;
  user_preferences: string[];
  liked_news: string[];
  created_at: string;
  read_articles: string[];
  favorite_news: string[];

  constructor(
    user_id: string = '',
    user_name = 'Default name',
    user_email = 'something@something.com',
    password = ' ',
    type = User.type.other,
    user_preferences: string[] = [],
    liked_news: string[] = [],
    created_at = ' '
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_email = user_email;
    this.password = password;
    this.user_type = type;
    this.user_preferences = user_preferences;
    this.liked_news = liked_news;
    this.created_at = created_at;
    this.read_articles = [];
    this.favorite_news = [];
  }
}

function userFromJSON(obj: any, operation: string = 'create'): { status: boolean; message: string; user: User } {
  if (!obj) {
    return {
      status: false,
      message: 'We do not accept an empty object',
      user: new User(),
    };
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.user_email)) {
    return {
      status: false,
      message: 'Enter a valid email',
      user: new User(),
    };
  } else {
    const userData = filterData(obj.user_email, 4) as User[];
    if (operation === 'create' && userData && userData[0] === null) {
      const { user_name, user_email, password, type, user_preferences, liked_news } = obj;
      const user_id = uuidv4();
      const created_at = format(new Date(), 'yyyyMMddHHmmss'); // Use date-fns format
      const hashedPassword = bcrypt.hashSync(password, 8);
  
      // Generate a verification token (you can use a library like uuid)
      const verificationToken = 'unique_token_generated_here';
  
      // Construct the verification URL
      const verificationUrl = `http://yourapp.com/verify?token=${verificationToken}`;
  
      // Send the verification email
      sendVerificationEmail(user_email, verificationUrl , "");
  
      // Create the user with unverified status
      return {
        status: true,
        message: 'User added successfully. Check your email for verification.',
        user: new User(user_id, user_name, user_email, hashedPassword, type, user_preferences, liked_news, created_at),
      };
    } else if (userData && userData[0] !== null) {
      return {
        status: false,
        message: 'User already exists',
        user: new User(),
      };
    }
  }

  // Default return in case none of the conditions match
  return {
    status: false,
    message: 'Operation failed',
    user: new User(),
  };
}

export { User, userFromJSON };
