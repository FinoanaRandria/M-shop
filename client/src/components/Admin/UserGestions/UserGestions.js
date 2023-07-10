import React from 'react'

function UserGestions() {
  return (
    <div>

<div className="flex w-full items-center justify-center min-h-screen">
    <div className="col-span-11">
      <div className="overflow-auto lg:overflow-visible ">
        <table className="table text-gray-400 border-separate space-y-11 text-sm">
          <thead className="bg-gray-800 text-gray-500 w-full">
            <tr>
              <th className="p-3">Id</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Adresse</th>
              <th className="p-3 text-left">Pays</th>
              <th className="p-3 text-left">Code Postal</th>
              <th className="p-3 text-left">Ville</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800">
              <td className="p-3">
                <div className="flex align-items-center">
                  <img
                    className="rounded-full h-12 w-12  object-cover"
                    src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                    alt="unsplash image"
                  />
                  <div className="ml-3">
                    <div className="">Appple</div>
                    <div className="text-gray-500">mail@rgmail.com</div>
                  </div>
                </div>
              </td>
              <td className="p-3">Technology</td>
              <td className="p-3 font-bold">200.00$</td>
              <td className="p-3 font-bold">200.00$</td>
              <td className="p-3 font-bold">200.00$</td>
              <div className="ml-3">
                    <div className="">Appple</div>
                    <div className="text-gray-500">mail@rgmail.com</div>
                  </div>
              <td className="p-3 font-bold">200.00$</td>

            </tr>
            
            
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n\t.table {\n\t\tborder-spacing: 0 15px;\n\t}\n\n\ti {\n\t\tfont-size: 1rem !important;\n\t}\n\n\t.table tr {\n\t\tborder-radius: 20px;\n\t}\n\n\ttr td:nth-child(n+7),\n\ttr th:nth-child(n+7) {\n\t\tborder-radius: 0 .625rem .625rem 0;\n\t}\n\n\ttr td:nth-child(1),\n\ttr th:nth-child(1) {\n\t\tborder-radius: .625rem 0 0 .625rem;\n\t}\n"
    }}
  />

    </div>
  )
}

export default UserGestions