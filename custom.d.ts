declare namespace Express {
	export interface Request {
		session? : {
			user_id: number;
		}
	}
}