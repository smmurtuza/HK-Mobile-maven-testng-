package appiumtest;

import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.remote.MobileCapabilityType;

//import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;


public class installingapp {
    
    static AppiumDriver driver;
    
    public static void main(String[] args) {
        try {
            DesiredCapabilities dc = new DesiredCapabilities();
            dc.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2"); // Use UiAutomator2 for Android versions 6.0+
            dc.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
            dc.setCapability(MobileCapabilityType.PLATFORM_VERSION, "11"); // Updated to reflect actual device OS version
            dc.setCapability(MobileCapabilityType.DEVICE_NAME, "Redmi 9");
            dc.setCapability(MobileCapabilityType.UDID, "97a606d80406");
            dc.setCapability("appPackage", "com.jbs.hk.c");
            dc.setCapability("appActivity", "com.jbs.hk.c.activity.SplashActivity");
            dc.setCapability(MobileCapabilityType.APP, "C:\\Users\\HK\\Downloads\\murtuza.apk");
            dc.setCapability("appium:adbExecTimeout", "60000"); // Set ADB execution timeout to 30 seconds
            dc.setCapability("appium:newCommandTimeout", "60000"); // Set ADB execution timeout to 30 seconds

            URL url = new URL("http://127.0.0.1:4723/wd/hub");

            driver = new AppiumDriver(url, dc);

            // Keep the app open for 10 seconds
            Thread.sleep(5000); // 10000 milliseconds = 10 seconds
            
         // Click on the 'Next' button by its ID
            WebElement  nextButton = driver.findElement(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.TextView"));
            nextButton.click();
            
            Thread.sleep(50000);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit(); // Close the app and end the session
            }
        }
    }
}
