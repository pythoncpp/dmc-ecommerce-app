//
//  ProfileViewController.swift
//  MyStore
//
//  Created by Amit Kulkarni on 20/01/24.
//

import UIKit

class ProfileViewController: BaseViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var tableView: UITableView!
    
    let options = ["Update My Profile", "Change Password", "View My Orders", "Logout"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.dataSource = self
        tableView.delegate = self
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return options.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .default, reuseIdentifier: nil)
        cell.textLabel?.text = options[indexPath.row]
        cell.accessoryType = .disclosureIndicator
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if indexPath.row == 3 {
            // logout
            let defaults = UserDefaults.standard
            defaults.setValue(false, forKey: "LOGIN_STATUS")
            defaults.setValue("", forKey: "TOKEN")
            defaults.setValue("", forKey: "USER_NAME")
            defaults.synchronize()
            
            let sceceDelegate =  self.view.window?.windowScene?.delegate as! SceneDelegate
            sceceDelegate.startLoginWorkflow()
        }
    }
    
}
