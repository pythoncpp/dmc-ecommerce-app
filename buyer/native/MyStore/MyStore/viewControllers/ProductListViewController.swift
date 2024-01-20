//
//  ProductListViewController.swift
//  MyStore
//
//  Created by Amit Kulkarni on 20/01/24.
//

import UIKit
import Alamofire

class ProductListViewController: BaseViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var tableView: UITableView!
    
    var products: [Product] = []
    
    var selectedProductIndex = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // add refresh button on right side
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .refresh, target: self, action: #selector(loadProducts))
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
    }
    
    override func viewDidAppear(_ animated: Bool) {
        loadProducts()
    }
    
    @objc func loadProducts() {
        let url = createUrl(path: "/product/search")
        let token = UserDefaults.standard.value(forKey: "TOKEN") as! String
        let headers: HTTPHeaders = [
            "token": token
        ]
        
        let request = AF.request(url, method: .get, headers: headers)
        request.response(completionHandler: { response in
            switch response.result {
            case let .success(value):
                if let data = value {
                    let result = try! JSONSerialization.jsonObject(with: data) as! [String: Any]
                    if result["status"] as! String == "success" {
                        let tmpProducts = result["data"] as! [[String: Any]]
                        
                        self.products.removeAll()
                        for tmpProduct in tmpProducts {
                            let product = Product()
                            product.id = tmpProduct["id"] as? Int
                            product.title = tmpProduct["title"] as? String
                            product.description = tmpProduct["description"] as? String
                            product.mrp = tmpProduct["mrp"] as? Int
                            product.discount = tmpProduct["discount"] as? Int
                            product.image = tmpProduct["image"] as? String
                            product.category = tmpProduct["category"] as? String
                            product.company = tmpProduct["company"] as? String
                            self.products.append(product)
                        }
                        self.tableView.reloadData()
                        
                    } else {
                        self.showError(message: result["error"] as! String)
                    }
                }
            case let .failure(error):
                print(error)
            }
        })
    }
    
    func addToCart(product: Product) {
        let url = createUrl(path: "/cart/")
        let price = product.mrp - ((product.mrp * product.discount)/100)
        let body = [
            "productId": product.id,
            "mrp": product.mrp,
            "price": price,
            "quantity": 1,
            "total": price
        ]
        let token = UserDefaults.standard.value(forKey: "TOKEN") as! String
        let headers: HTTPHeaders = [
            "token": token
        ]
        let request = AF.request(url, method: .post, parameters: body, headers: headers)
        request.response(completionHandler: {response in
            switch response.result {
            case let .success(data):
                if let data = data {
                    let result = try! JSONSerialization.jsonObject(with: data) as! [String: Any]
                    if result["status"] as! String == "success" {
                        self.showSuccess(message: "added the product to your cart")
                    } else {
                        self.showError(message: result["error"] as! String)
                    }
                }
            case let .failure(error):
                print(error)
            }
        })
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")!
        
        let imageView = cell.viewWithTag(100) as! UIImageView
        let labelTitle = cell.viewWithTag(101) as! UILabel
        let labelCategory = cell.viewWithTag(102) as! UILabel
        let labelPrice = cell.viewWithTag(103) as! UILabel
        let buttonAddToCart = cell.viewWithTag(104) as! UIButton
        
        let product = products[indexPath.row]
        labelTitle.text = product.title
        labelCategory.text = "\(product.category!), \(product.company!)"
        labelPrice.text = "MRP: \(product.mrp!) Discount: \(product.discount!)%"
        
        // load the product image
        loadImage(image: product.image, imageView: imageView)
        
        // add touch up inside handler on button
        
        buttonAddToCart.addAction(UIAction(handler: {action in
            self.addToCart(product: product)
        }), for: .touchUpInside)
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}
