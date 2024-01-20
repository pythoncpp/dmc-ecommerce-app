//
//  LoginViewController.swift
//  MyStore
//
//  Created by Amit Kulkarni on 20/01/24.
//

import UIKit
import Alamofire

class LoginViewController: BaseViewController {
    
    @IBOutlet weak var editEmail: UITextField!
    @IBOutlet weak var editPassword: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func onLogin(_ sender: Any) {
        if (editEmail.text!.count == 0) {
            showError(message: "please enter email")
        } else if (editPassword.text!.count == 0) {
            showError(message: "please enter password")
        } else {
            
            // create the url for login
            let url = createUrl(path: "/customer/login")
            
            // create body
            let body = [
                "email": editEmail.text!,
                "password": editPassword.text!
            ]
            
            // create a request
            let request = AF.request(
                url,
                method: .post,
                parameters: body
            )
            
            // send the request and get the response
            request.response(completionHandler: { response in
                switch response.result {
                case let .success(value):
                    if let data = value {
                        
                        // typecast the data to the rquired format
                        let result = try! JSONSerialization.jsonObject(with: data) as! [String: Any]
                                                
                        // check the status
                        if result["status"] as! String == "success" {
                            let userData = result["data"] as! [String: String]
                            
                            let name = userData["name"]!
                            let token = userData["token"]!
                            
                            // get the user defaults
                            let defaults = UserDefaults.standard
                            
                            
                            // set the login flag to true
                            defaults.setValue(true, forKey: "LOGIN_STATUS")
                            defaults.setValue(token, forKey: "TOKEN")
                            defaults.set(name, forKey: "USER_NAME")
                            
                            // save the defaults
                            defaults.synchronize()
                            
                            let sceceDelegate =  self.view.window?.windowScene?.delegate as! SceneDelegate
                            sceceDelegate.startHomeWorkflow()
                            
                        } else {
                            self.showError(message: result["error"] as! String)
                            
                        }
                    }
                case let .failure(error):
                    print(error)
                }
            })
        }
    }
}
